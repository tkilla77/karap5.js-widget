import * as React from "react";
import * as PureRenderMixin from 'react-addons-pure-render-mixin';

export default class PureComponent<P, S> extends React.Component<P, S> {
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }
}
