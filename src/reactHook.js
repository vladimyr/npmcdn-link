const isFunction = arg => typeof arg === 'function';

export default function injectHook(onCommitFiberRoot) {
  const desc = Object.getOwnPropertyDescriptor(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__');
  if (!desc || desc.writable) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {
      supportsFiber: true,
      inject: () => { }
    };
  }
  const { onCommitFiberRoot: _onCommitFiberRoot } = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function () {
    try {
      onCommitFiberRoot.apply(this, arguments);
    } catch (err) {
      console.error(err);
    }
    if (isFunction(_onCommitFiberRoot)) _onCommitFiberRoot.apply(this, arguments);
  };
}

export function getProps(fiberRoot) {
  const { memoizedState: state } = fiberRoot.current;
  return state.element.props;
}
