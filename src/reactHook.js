export default function injectDevtoolsHook(onCommitFiberRoot) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {
    supportsFiber: true,
    inject: () => { }
  };
  const { onCommitFiberRoot: _onCommitFiberRoot } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function () {
    onCommitFiberRoot.apply(this, arguments);
    if (onCommitFiberRoot) _onCommitFiberRoot.apply(this, arguments);
  };
}

export function getProps(fiberRoot) {
  const { memoizedState: state } = fiberRoot.current;
  return state.element.props;
}
