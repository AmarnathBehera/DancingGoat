System.register(['react', '@kentico/xperience-admin-components', '@kentico/xperience-admin-base'], function (exports) {
    'use strict';

    var React;
    var Components;
    var AdminBase;

    return {
        setters: [
            function (module) {
                React = module.default || module;
            },
            function (module) {
                Components = module;
            },
            function (module) {
                AdminBase = module;
            }
        ],
        execute: function () {
            var EditQuery = function (props) {
                var executeCommand = AdminBase.usePageCommandProvider().executeCommand;
                var textAreaRef = React.createRef();
                var queryState = React.useState(props.query);
                var queryText = queryState[0];
                var setQueryText = queryState[1];
                var savedQueryState = React.useState(props.savedQueries);
                var savedQueries = savedQueryState[0];
                var setSavedQueries = savedQueryState[1];
                var runSql = AdminBase.usePageCommand('RunSql').execute;
                var notify = AdminBase.usePageCommand('Notify').execute;
                var saveQuery = AdminBase.usePageCommand('SaveQuery', {
                    after: function (newQuery) {
                        if (!newQuery) {
                            return;
                        }

                        var newQueries = savedQueries.slice();
                        newQueries.push(newQuery);
                        setSavedQueries(newQueries);
                    }
                }).execute;
                var deleteQuery = AdminBase.usePageCommand('DeleteQuery', {
                    after: async function (id) {
                        if (!id || id <= 0) {
                            return;
                        }

                        var newQueries = savedQueries.filter(function (query) {
                            return query.id !== id;
                        });

                        newQueries.forEach(function (query, index) {
                            query.order = index;
                        });

                        setSavedQueries(newQueries);

                        await executeCommand('UpdateSavedOrder', newQueries);
                    }
                }).execute;

                var deleteClick = function (id) {
                    var confirmed = confirm('Are you sure you want to delete this query?');

                    if (!confirmed) {
                        return;
                    }

                    deleteQuery(id);
                };

                var transferClick = function (text) {
                    if (!textAreaRef.current) {
                        return;
                    }

                    setQueryText(text);
                    textAreaRef.current.textContent = text;

                    notify('Query copied to editor');
                };

                var generateQuery = function (table) {
                    if (!textAreaRef.current) {
                        return;
                    }

                    var query = ('SELECT ' + table.columns.join(', ') + '\n' +
                        'FROM ' + table.name + '\n' +
                        'WHERE ChannelID = ' + props.reportingChannelSettingId).trim();

                    setQueryText(query);
                    textAreaRef.current.textContent = query;

                    notify('Channel filtered SQL generated');
                };

                var clearClick = function () {
                    if (!textAreaRef.current) {
                        return;
                    }

                    setQueryText('');
                    textAreaRef.current.textContent = '';
                };

                var runClick = function () {
                    if (!queryText || queryText.length <= 0) {
                        alert('Please enter a query to execute.');
                        return;
                    }

                    runSql(queryText);
                };

                var copyClick = async function () {
                    if (!queryText || queryText.length <= 0) {
                        return;
                    }

                    await navigator.clipboard.writeText(queryText);

                    notify('Query copied to clipboard');
                };

                var saveClick = async function () {
                    if (!queryText || queryText.length <= 0) {
                        alert('Please enter a query in the editor');
                        return;
                    }

                    var name = prompt('Enter new query name');

                    if (!name) {
                        return;
                    }

                    saveQuery({
                        id: 0,
                        order: 0,
                        name: name,
                        text: queryText
                    });
                };

                var updateQueryOrder = function (oldQueries, sourceIndex, destinationIndex) {
                    var newQueries = oldQueries.slice();
                    var sourceField = newQueries.splice(sourceIndex, 1)[0];

                    newQueries.splice(destinationIndex, 0, sourceField);

                    newQueries.forEach(function (query, index) {
                        query.order = index;
                    });

                    setSavedQueries(newQueries);

                    return newQueries;
                };

                var savedQueryDragEnd = async function (dropResult) {
                    if (dropResult.source.index === (dropResult.destination && dropResult.destination.index)) {
                        return;
                    }

                    var sourceIndex = dropResult.source.index;
                    var destinationIndex = (dropResult.destination && dropResult.destination.index) || 0;
                    var newQueries = updateQueryOrder(savedQueries, sourceIndex, destinationIndex);
                    var updateSuccessful = await executeCommand('UpdateSavedOrder', newQueries);

                    if (!updateSuccessful) {
                        updateQueryOrder(newQueries, destinationIndex, sourceIndex);
                    }
                };

                var renderSavedQueries = function () {
                    return savedQueries.map(function (query) {
                        return React.createElement(
                            Components.BarItemDraggable,
                            {
                                key: query.id,
                                index: query.order,
                                draggableId: query.id.toString(),
                                leadingButtons: [
                                    {
                                        label: 'Run',
                                        icon: 'xp-caret-right',
                                        tooltip: 'Execute query',
                                        onClick: function () { return runSql(query.text); }
                                    },
                                    {
                                        label: 'Copy',
                                        icon: 'xp-doc-copy',
                                        tooltip: 'Copy query to editor',
                                        onClick: function () { return transferClick(query.text); }
                                    },
                                    {
                                        label: 'Delete',
                                        icon: 'xp-bin',
                                        tooltip: 'Delete query',
                                        onClick: function () { return deleteClick(query.id); }
                                    }
                                ],
                                headerColumns: [
                                    {
                                        content: React.createElement('span', null, query.name)
                                    }
                                ]
                            },
                            React.createElement('span', null, query.text)
                        );
                    });
                };

                var renderTextActions = function () {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(Components.Button, {
                            label: 'Save',
                            color: Components.ButtonColor.Primary,
                            size: Components.ButtonSize.S,
                            onClick: saveClick,
                            icon: 'xp-doc-plus'
                        }),
                        React.createElement(Components.Button, {
                            label: 'Copy',
                            color: Components.ButtonColor.Tertiary,
                            size: Components.ButtonSize.S,
                            onClick: copyClick,
                            icon: 'xp-doc-copy'
                        }),
                        React.createElement(Components.Button, {
                            label: 'Clear',
                            color: Components.ButtonColor.Tertiary,
                            size: Components.ButtonSize.S,
                            onClick: clearClick,
                            icon: 'xp-doc-torn'
                        }),
                        props.tables.length > 0 && React.createElement(
                            Components.DropDownSelectMenu,
                            {
                                renderTrigger: function (ref, onTriggerClick) {
                                    return React.createElement(Components.Button, {
                                        label: 'Tables',
                                        size: Components.ButtonSize.S,
                                        borderless: true,
                                        icon: 'xp-database',
                                        buttonRef: ref,
                                        onClick: function () { return onTriggerClick(); }
                                    });
                                }
                            },
                            props.tables.map(function (table) {
                                return React.createElement(Components.MenuItem, {
                                    key: table.name,
                                    primaryLabel: table.name,
                                    onClick: function () { return generateQuery(table); }
                                });
                            })
                        )
                    );
                };

                return React.createElement(
                    Components.Row,
                    { spacing: Components.Spacing.XL },
                    React.createElement(Components.Column, { cols: Components.Cols.Col1 }),
                    React.createElement(
                        Components.Column,
                        { cols: Components.Cols.Col10 },
                        React.createElement(
                            Components.Stack,
                            { spacing: Components.Spacing.XL },
                            React.createElement(Components.Button, {
                                label: 'Run',
                                icon: 'xp-caret-right',
                                color: Components.ButtonColor.Primary,
                                onClick: runClick
                            }),
                            React.createElement(
                                Components.Card,
                                { headline: 'Query' },
                                React.createElement(Components.TextArea, {
                                    minRows: 10,
                                    maxRows: 40,
                                    value: queryText,
                                    textAreaRef: textAreaRef,
                                    placeholder: 'Enter SQL query...',
                                    onChange: function (event) { return setQueryText(event.target.value); },
                                    renderActions: renderTextActions
                                })
                            ),
                            savedQueries.length > 0 && React.createElement(
                                Components.Card,
                                { headline: 'Saved queries' },
                                React.createElement(
                                    Components.BarItemGroup,
                                    {
                                        droppableId: 'savedQueryDroppable',
                                        onDragEnd: savedQueryDragEnd
                                    },
                                    renderSavedQueries()
                                )
                            )
                        )
                    ),
                    React.createElement(Components.Column, { cols: Components.Cols.Col1 })
                );
            };

            var EditQueryTemplate = EditQuery;

            exports('EditQuery', EditQuery);
            exports('EditQueryTemplate', EditQueryTemplate);
            exports('default', EditQuery);
        }
    };
});
