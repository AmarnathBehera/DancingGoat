System.register(["@kentico/xperience-admin-base","@kentico/xperience-admin-components","react"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE__90__ = {};
	var __WEBPACK_EXTERNAL_MODULE__267__ = {};
	var __WEBPACK_EXTERNAL_MODULE__726__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE__726__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				__WEBPACK_EXTERNAL_MODULE__90__.usePageCommand = module.usePageCommand;
				__WEBPACK_EXTERNAL_MODULE__90__.usePageCommandProvider = module.usePageCommandProvider;
			},
			function(module) {
				__WEBPACK_EXTERNAL_MODULE__267__.BarItemDraggable = module.BarItemDraggable;
				__WEBPACK_EXTERNAL_MODULE__267__.BarItemGroup = module.BarItemGroup;
				__WEBPACK_EXTERNAL_MODULE__267__.Button = module.Button;
				__WEBPACK_EXTERNAL_MODULE__267__.ButtonColor = module.ButtonColor;
				__WEBPACK_EXTERNAL_MODULE__267__.ButtonSize = module.ButtonSize;
				__WEBPACK_EXTERNAL_MODULE__267__.Card = module.Card;
				__WEBPACK_EXTERNAL_MODULE__267__.Cols = module.Cols;
				__WEBPACK_EXTERNAL_MODULE__267__.Column = module.Column;
				__WEBPACK_EXTERNAL_MODULE__267__.DropDownSelectMenu = module.DropDownSelectMenu;
				__WEBPACK_EXTERNAL_MODULE__267__.MenuItem = module.MenuItem;
				__WEBPACK_EXTERNAL_MODULE__267__.Row = module.Row;
				__WEBPACK_EXTERNAL_MODULE__267__.Spacing = module.Spacing;
				__WEBPACK_EXTERNAL_MODULE__267__.Stack = module.Stack;
				__WEBPACK_EXTERNAL_MODULE__267__.TextArea = module.TextArea;
			},
			function(module) {
				__WEBPACK_EXTERNAL_MODULE__726__["default"] = module["default"] || module;
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE__726__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 20
(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(726),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ },

/***/ 848
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(20);
} else // removed by dead control flow
{}


/***/ },

/***/ 126
(__unused_webpack_module, exports, __webpack_require__) {

const resolveDirectory = (__webpack_require__(358)/* .resolveDirectory */ .y);

exports.w = function autoPublicPath(rootDirLevel) {
  if (!rootDirLevel) {
    rootDirLevel = 1;
  }

  if (true) {
    if (false) // removed by dead control flow
{}

    if (!__webpack_require__.y.meta || !__webpack_require__.y.meta.url) {
      console.error("__system_context__", __webpack_require__.y);
      throw Error(
        "systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided"
      );
    }

    __webpack_require__.p = resolveDirectory(
      __webpack_require__.y.meta.url,
      rootDirLevel
    );
  }
};


/***/ },

/***/ 358
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
__webpack_unused_export__ = function setPublicPath(
  systemjsModuleName,
  rootDirectoryLevel
) {
  if (!rootDirectoryLevel) {
    rootDirectoryLevel = 1;
  }
  if (
    typeof systemjsModuleName !== "string" ||
    systemjsModuleName.trim().length === 0
  ) {
    throw Error(
      "systemjs-webpack-interop: setPublicPath(systemjsModuleName) must be called with a non-empty string 'systemjsModuleName'"
    );
  }

  if (
    typeof rootDirectoryLevel !== "number" ||
    rootDirectoryLevel <= 0 ||
    isNaN(rootDirectoryLevel) ||
    !isInteger(rootDirectoryLevel)
  ) {
    throw Error(
      "systemjs-webpack-interop: setPublicPath(systemjsModuleName, rootDirectoryLevel) must be called with a positive integer 'rootDirectoryLevel'"
    );
  }

  var moduleUrl;
  try {
    moduleUrl = window.System.resolve(systemjsModuleName);
    if (!moduleUrl) {
      throw Error();
    }
  } catch (err) {
    throw Error(
      "systemjs-webpack-interop: There is no such module '" +
        systemjsModuleName +
        "' in the SystemJS registry. Did you misspell the name of your module?"
    );
  }

  __webpack_require__.p = resolveDirectory(moduleUrl, rootDirectoryLevel);
};

function resolveDirectory(urlString, rootDirectoryLevel) {
  // Our friend IE11 doesn't support new URL()
  // https://github.com/single-spa/single-spa/issues/612
  // https://gist.github.com/jlong/2428561

  var a = document.createElement("a");
  a.href = urlString;

  var pathname = a.pathname[0] === "/" ? a.pathname : "/" + a.pathname;
  var numDirsProcessed = 0,
    index = pathname.length;
  while (numDirsProcessed !== rootDirectoryLevel && index >= 0) {
    var char = pathname[--index];
    if (char === "/") {
      numDirsProcessed++;
    }
  }

  if (numDirsProcessed !== rootDirectoryLevel) {
    throw Error(
      "systemjs-webpack-interop: rootDirectoryLevel (" +
        rootDirectoryLevel +
        ") is greater than the number of directories (" +
        numDirsProcessed +
        ") in the URL path " +
        urlString
    );
  }

  var finalPath = pathname.slice(0, index + 1);

  return a.protocol + "//" + a.host + finalPath;
}

exports.y = resolveDirectory;

// borrowed from https://github.com/parshap/js-is-integer/blob/master/index.js
var isInteger =
  Number.isInteger ||
  function isInteger(val) {
    return typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  };


/***/ },

/***/ 90
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__90__;

/***/ },

/***/ 267
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__267__;

/***/ },

/***/ 726
(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__726__;

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/__system_context__ */
/******/ 	(() => {
/******/ 		__webpack_require__.y = __system_context__;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
const autoPublicPath = (__webpack_require__(126)/* .autoPublicPath */ .w);

autoPublicPath(1);

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  EditQuery: () => (/* reexport */ EditQueryTemplate),
  EditQueryTemplate: () => (/* reexport */ EditQueryTemplate),
  "default": () => (/* reexport */ EditQueryTemplate)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(726);
// EXTERNAL MODULE: external "@kentico/xperience-admin-components"
var xperience_admin_components_ = __webpack_require__(267);
// EXTERNAL MODULE: external "@kentico/xperience-admin-base"
var xperience_admin_base_ = __webpack_require__(90);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
;// ./src/EditQuery.tsx




/** Copy of C# DatabaseTable class */

/** Copy of C# SavedQuery class */

/** Copy of C# EditSqlTemplateClientProperties class */

/** Copy of C# SqlBrowserQueryResult class */

const EditQuery = props => {
  const {
    executeCommand
  } = (0,xperience_admin_base_.usePageCommandProvider)();
  const textAreaRef = /*#__PURE__*/external_react_["default"].createRef();
  const [queryText, setQueryText] = (0,external_react_.useState)(props.query);
  const [savedQueries, setSavedQueries] = (0,external_react_.useState)(props.savedQueries);
  const [queryResult, setQueryResult] = (0,external_react_.useState)();
  const [isRunningQuery, setIsRunningQuery] = (0,external_react_.useState)(false);
  const {
    execute: runSql
  } = (0,xperience_admin_base_.usePageCommand)('RunSql', {
    after: result => {
      setIsRunningQuery(false);
      if (!result) {
        return;
      }
      setQueryResult(result);
      if (result.autoSavedQuery) {
        setSavedQueries(currentQueries => [...currentQueries, result.autoSavedQuery]);
      }
    }
  });
  const {
    execute: notify
  } = (0,xperience_admin_base_.usePageCommand)('Notify');
  const {
    execute: saveQuery
  } = (0,xperience_admin_base_.usePageCommand)('SaveQuery', {
    after: newQuery => {
      if (!newQuery) {
        return;
      }
      const newQueries = [...savedQueries];
      newQueries.push(newQuery);
      setSavedQueries(newQueries);
    }
  });
  const {
    execute: renameQuery
  } = (0,xperience_admin_base_.usePageCommand)('RenameQuery', {
    after: updatedQuery => {
      if (!updatedQuery) {
        return;
      }
      setSavedQueries(currentQueries => currentQueries.map(query => {
        if (query.id !== updatedQuery.id) {
          return query;
        }
        return updatedQuery;
      }));
    }
  });
  const {
    execute: deleteQuery
  } = (0,xperience_admin_base_.usePageCommand)('DeleteQuery', {
    after: async id => {
      if (!id || id <= 0) {
        return;
      }
      const newQueries = savedQueries.filter(q => q.id !== id);
      newQueries.forEach((query, i) => {
        query.order = i;
      });
      setSavedQueries(newQueries);
      await executeCommand('UpdateSavedOrder', newQueries);
    }
  });
  const renameClick = query => {
    const name = prompt('Enter query name', query.name);
    if (!name) {
      return;
    }
    renameQuery({
      ...query,
      name
    });
  };
  const deleteClick = id => {
    const confirmed = confirm('Are you sure you want to delete this query?');
    if (!confirmed) {
      return;
    }
    deleteQuery(id);
  };
  const transferClick = text => {
    if (!textAreaRef.current) {
      return;
    }
    setQueryText(text);
    textAreaRef.current.textContent = text;
    notify('Query copied to editor');
  };
  const generateQuery = table => {
    if (!textAreaRef.current) {
      return;
    }
    const q = `
SELECT ${table.columns.join(', ')}
FROM ${table.name}
WHERE ChannelID = ${props.reportingChannelSettingId}
`.trim();
    setQueryText(q);
    textAreaRef.current.textContent = q;
    notify('Channel filtered SQL generated');
  };
  const clearClick = () => {
    if (!textAreaRef.current) {
      return;
    }
    setQueryText('');
    textAreaRef.current.textContent = '';
  };
  const runClick = () => {
    if (!queryText || queryText.length <= 0) {
      alert('Please enter a query to execute.');
      return;
    }
    setIsRunningQuery(true);
    runSql(queryText);
  };
  const copyClick = async () => {
    if (!queryText || queryText.length <= 0) {
      return;
    }
    await navigator.clipboard.writeText(queryText);
    notify('Query copied to clipboard');
  };
  const saveClick = async () => {
    if (!queryText || queryText.length <= 0) {
      alert('Please enter a query in the editor');
      return;
    }
    const name = prompt('Enter new query name');
    if (!name) {
      return;
    }
    saveQuery({
      id: 0,
      order: 0,
      name,
      text: queryText
    });
  };
  const savedQueryDragEnd = async dropResult => {
    if (dropResult.source.index === dropResult.destination?.index) {
      return;
    }
    const sourceIndex = dropResult.source.index;
    const destinationIndex = dropResult.destination?.index || 0;
    const newQueries = updateQueryOrder(savedQueries, sourceIndex, destinationIndex);
    const updateSuccessful = await executeCommand('UpdateSavedOrder', newQueries);
    if (!updateSuccessful) {
      updateQueryOrder(newQueries, destinationIndex, sourceIndex);
    }
  };
  const updateQueryOrder = (oldQueries, sourceIndex, destinationIndex) => {
    const newQueries = [...oldQueries];
    const [sourceField] = newQueries.splice(sourceIndex, 1);
    newQueries.splice(destinationIndex, 0, sourceField);
    newQueries.forEach((query, i) => {
      query.order = i;
    });
    setSavedQueries(newQueries);
    return newQueries;
  };
  const renderSavedQueries = () => savedQueries.map(q => /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.BarItemDraggable, {
    index: q.order,
    draggableId: q.id.toString(),
    leadingButtons: [{
      label: 'Run',
      icon: 'xp-caret-right',
      tooltip: 'Execute query',
      onClick: () => {
        setQueryText(q.text);
        setIsRunningQuery(true);
        runSql(q.text);
      }
    }, {
      label: 'Copy',
      icon: 'xp-doc-copy',
      tooltip: 'Copy query to editor',
      onClick: () => transferClick(q.text)
    }, {
      label: 'Rename',
      icon: 'xp-edit',
      tooltip: 'Rename query',
      onClick: () => renameClick(q)
    }, {
      label: 'Delete',
      icon: 'xp-bin',
      tooltip: 'Delete query',
      onClick: () => deleteClick(q.id)
    }],
    headerColumns: [{
      content: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
        children: q.name
      })
    }],
    children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
      children: q.text
    })
  }, q.id));
  const renderQueryResult = () => {
    if (isRunningQuery) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
        headline: "Results",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "Running query..."
        })
      });
    }
    if (!queryResult) {
      return null;
    }
    if (queryResult.errorMessage) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
        headline: "Results",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: queryResult.errorMessage
        })
      });
    }
    if (queryResult.rows.length === 0) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
        headline: "Results",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "No rows returned."
        })
      });
    }
    return /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
      headline: `Results (${queryResult.rows.length})`,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        style: {
          overflowX: 'auto'
        },
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("table", {
          style: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("thead", {
            children: /*#__PURE__*/(0,jsx_runtime.jsx)("tr", {
              children: queryResult.columns.map(column => /*#__PURE__*/(0,jsx_runtime.jsx)("th", {
                style: {
                  textAlign: 'left',
                  borderBottom: '1px solid #d6d9dc',
                  padding: '0.5rem'
                },
                children: column
              }, column))
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsx)("tbody", {
            children: queryResult.rows.map((row, rowIndex) => /*#__PURE__*/(0,jsx_runtime.jsx)("tr", {
              children: row.map((value, columnIndex) => /*#__PURE__*/(0,jsx_runtime.jsx)("td", {
                style: {
                  borderBottom: '1px solid #eef0f2',
                  padding: '0.5rem',
                  verticalAlign: 'top'
                },
                children: value
              }, `${rowIndex}-${columnIndex}`))
            }, rowIndex))
          })]
        })
      })
    });
  };
  const renderTextActions = () => /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Button, {
      label: "Save",
      color: xperience_admin_components_.ButtonColor.Primary,
      size: xperience_admin_components_.ButtonSize.S,
      onClick: saveClick,
      icon: "xp-doc-plus"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Button, {
      label: "Copy",
      color: xperience_admin_components_.ButtonColor.Tertiary,
      size: xperience_admin_components_.ButtonSize.S,
      onClick: copyClick,
      icon: "xp-doc-copy"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Button, {
      label: "Clear",
      color: xperience_admin_components_.ButtonColor.Tertiary,
      size: xperience_admin_components_.ButtonSize.S,
      onClick: clearClick,
      icon: "xp-doc-torn"
    }), props.tables.length > 0 && /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.DropDownSelectMenu, {
      renderTrigger: (ref, onTriggerClick) => /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Button, {
        label: "Tables",
        size: xperience_admin_components_.ButtonSize.S,
        borderless: true,
        icon: "xp-database",
        buttonRef: ref,
        onClick: () => onTriggerClick()
      }),
      children: props.tables.map(table => /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.MenuItem, {
        primaryLabel: table.name,
        onClick: () => generateQuery(table)
      }, table.name))
    })]
  });
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(xperience_admin_components_.Row, {
    spacing: xperience_admin_components_.Spacing.XL,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Column, {
      cols: xperience_admin_components_.Cols.Col1
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Column, {
      cols: xperience_admin_components_.Cols.Col10,
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)(xperience_admin_components_.Stack, {
        spacing: xperience_admin_components_.Spacing.XL,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Button, {
          label: "Run",
          icon: "xp-caret-right",
          color: xperience_admin_components_.ButtonColor.Primary,
          onClick: runClick
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
          headline: "Query",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.TextArea, {
            minRows: 10,
            maxRows: 40,
            value: queryText,
            textAreaRef: textAreaRef,
            placeholder: "Enter SQL query...",
            onChange: e => setQueryText(e.target.value),
            renderActions: renderTextActions
          })
        }), renderQueryResult(), savedQueries.length > 0 && /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Card, {
          headline: "Saved queries",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.BarItemGroup, {
            droppableId: "savedQueryDroppable",
            onDragEnd: savedQueryDragEnd,
            children: renderSavedQueries()
          })
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(xperience_admin_components_.Column, {
      cols: xperience_admin_components_.Cols.Col1
    })]
  });
};
const EditQueryTemplate = EditQuery;
/* harmony default export */ const src_EditQuery = ((/* unused pure expression or super */ null && (EditQuery)));
;// ./src/EditQueryTemplate.tsx

;// ./src/entry.tsx



})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});