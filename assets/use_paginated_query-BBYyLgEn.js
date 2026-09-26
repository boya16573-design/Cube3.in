import { a as useQueries, c as useConvex, dt as __toESM, f as getFunctionName, h as convexToJson, lt as require_react, m as ConvexError } from "./api-D74LnTM3.js";
//#region node_modules/convex/dist/esm/react/use_paginated_query.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var splitQuery = (key, splitCursor, continueCursor) => (prevState) => {
	const queries = { ...prevState.queries };
	const splitKey1 = prevState.nextPageKey;
	const splitKey2 = prevState.nextPageKey + 1;
	const nextPageKey = prevState.nextPageKey + 2;
	queries[splitKey1] = {
		query: prevState.query,
		args: {
			...prevState.args,
			paginationOpts: {
				...prevState.queries[key].args.paginationOpts,
				endCursor: splitCursor
			}
		}
	};
	queries[splitKey2] = {
		query: prevState.query,
		args: {
			...prevState.args,
			paginationOpts: {
				...prevState.queries[key].args.paginationOpts,
				cursor: splitCursor,
				endCursor: continueCursor
			}
		}
	};
	const ongoingSplits = { ...prevState.ongoingSplits };
	ongoingSplits[key] = [splitKey1, splitKey2];
	return {
		...prevState,
		nextPageKey,
		queries,
		ongoingSplits
	};
};
var completeSplitQuery = (key) => (prevState) => {
	const completedSplit = prevState.ongoingSplits[key];
	if (completedSplit === void 0) return prevState;
	const queries = { ...prevState.queries };
	delete queries[key];
	const ongoingSplits = { ...prevState.ongoingSplits };
	delete ongoingSplits[key];
	let pageKeys = prevState.pageKeys.slice();
	const pageIndex = prevState.pageKeys.findIndex((v) => v === key);
	if (pageIndex >= 0) pageKeys = [
		...prevState.pageKeys.slice(0, pageIndex),
		...completedSplit,
		...prevState.pageKeys.slice(pageIndex + 1)
	];
	return {
		...prevState,
		queries,
		pageKeys,
		ongoingSplits
	};
};
function usePaginatedQuery(query, args, options) {
	const { user: positionalResult } = usePaginatedQueryInternal(query, args, options, true);
	return positionalResult;
}
var includePage = Symbol("includePageKeys");
var page = Symbol("page");
function usePaginatedQueryInternal(query, args, options, throwOnError = true) {
	if (typeof options?.initialNumItems !== "number" || options.initialNumItems < 0) throw new Error(`\`options.initialNumItems\` must be a positive number. Received \`${options?.initialNumItems}\`.`);
	const skip = args === "skip";
	const argsObject = skip ? {} : args;
	const queryName = getFunctionName(query);
	const createInitialState = (0, import_react.useMemo)(() => {
		return () => {
			const id = nextPaginationId();
			return {
				query,
				args: argsObject,
				id,
				nextPageKey: 1,
				pageKeys: skip ? [] : [0],
				queries: skip ? {} : { 0: {
					query,
					args: {
						...argsObject,
						paginationOpts: {
							numItems: options.initialNumItems,
							cursor: null,
							id
						}
					}
				} },
				ongoingSplits: {},
				skip
			};
		};
	}, [
		JSON.stringify(convexToJson(argsObject)),
		queryName,
		options.initialNumItems,
		skip
	]);
	const [state, setState] = (0, import_react.useState)(createInitialState);
	let currState = state;
	if (getFunctionName(query) !== getFunctionName(state.query) || JSON.stringify(convexToJson(argsObject)) !== JSON.stringify(convexToJson(state.args)) || skip !== state.skip) {
		currState = createInitialState();
		setState(currState);
	}
	const logger = useConvex().logger;
	const resultsObject = useQueries(currState.queries);
	const isIncludingPageKeys = options[includePage] ?? false;
	const [results, maybeLastResult, maybeError] = (0, import_react.useMemo)(() => {
		let currResult = void 0;
		const allItems = [];
		for (const pageKey of currState.pageKeys) {
			currResult = resultsObject[pageKey];
			if (currResult === void 0) break;
			if (currResult instanceof Error) if (currResult.message.includes("InvalidCursor") || currResult instanceof ConvexError && typeof currResult.data === "object" && currResult.data?.isConvexSystemError === true && currResult.data?.paginationError === "InvalidCursor") {
				logger.warn("usePaginatedQuery hit error, resetting pagination state: " + currResult.message);
				setState(createInitialState);
				return [
					[],
					void 0,
					void 0
				];
			} else {
				if (throwOnError) throw currResult;
				return [
					allItems,
					void 0,
					currResult
				];
			}
			const ongoingSplit = currState.ongoingSplits[pageKey];
			if (ongoingSplit !== void 0) {
				if (resultsObject[ongoingSplit[0]] !== void 0 && resultsObject[ongoingSplit[1]] !== void 0) setState(completeSplitQuery(pageKey));
			} else if (currResult.splitCursor && (currResult.pageStatus === "SplitRecommended" || currResult.pageStatus === "SplitRequired" || currResult.page.length > options.initialNumItems * 2)) setState(splitQuery(pageKey, currResult.splitCursor, currResult.continueCursor));
			if (currResult.pageStatus === "SplitRequired") return [
				allItems,
				void 0,
				void 0
			];
			allItems.push(...isIncludingPageKeys ? currResult.page.map((i) => ({
				...i,
				[page]: pageKey.toString()
			})) : currResult.page);
		}
		return [
			allItems,
			currResult,
			void 0
		];
	}, [
		resultsObject,
		currState.pageKeys,
		currState.ongoingSplits,
		options.initialNumItems,
		createInitialState,
		logger,
		isIncludingPageKeys,
		throwOnError
	]);
	return {
		user: {
			results,
			...(0, import_react.useMemo)(() => {
				if (maybeError !== void 0) return {
					status: "Error",
					isLoading: false,
					error: maybeError,
					loadMore: () => {}
				};
				if (maybeLastResult === void 0) if (currState.nextPageKey === 1) return {
					status: "LoadingFirstPage",
					isLoading: true,
					loadMore: () => {}
				};
				else return {
					status: "LoadingMore",
					isLoading: true,
					loadMore: (_numItems) => {}
				};
				if (maybeLastResult.isDone) return {
					status: "Exhausted",
					isLoading: false,
					loadMore: (_numItems) => {}
				};
				const continueCursor = maybeLastResult.continueCursor;
				let alreadyLoadingMore = false;
				return {
					status: "CanLoadMore",
					isLoading: false,
					loadMore: (numItems) => {
						if (!alreadyLoadingMore) {
							alreadyLoadingMore = true;
							setState((prevState) => {
								const pageKeys = [...prevState.pageKeys, prevState.nextPageKey];
								const queries = { ...prevState.queries };
								queries[prevState.nextPageKey] = {
									query: prevState.query,
									args: {
										...prevState.args,
										paginationOpts: {
											numItems,
											cursor: continueCursor,
											id: prevState.id
										}
									}
								};
								return {
									...prevState,
									nextPageKey: prevState.nextPageKey + 1,
									pageKeys,
									queries
								};
							});
						}
					}
				};
			}, [
				maybeError,
				maybeLastResult,
				currState.nextPageKey
			])
		},
		internal: { state: currState }
	};
}
var paginationId = 0;
function nextPaginationId() {
	paginationId++;
	return paginationId;
}
//#endregion
export { usePaginatedQuery as t };
