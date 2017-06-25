'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var divider = ',';

function prepare(val) {
  if (!val) {
    return val;
  }
  return String(val).replace(/\./g, divider);
}

var NumberInput = function (_React$Component) {
  _inherits(NumberInput, _React$Component);

  function NumberInput(props) {
    _classCallCheck(this, NumberInput);

    var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

    _this.state = {
      value: prepare(props.value)
    };

    _this._onChange = _this._onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(NumberInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.refs.input !== document.activeElement) {
        this.setState({
          value: prepare(newProps.value)
        });
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      var _this2 = this;

      var value = e.target.value;

      if (new RegExp(/^[0-9\.,-\s]*$/).test(value) == false) {
        e.preventDefault(false);
        return this.setState({
          value: this.state.value
        });
      }

      if (value == " ") {
        value = "0,";
      } else {
        value = value.replace(/(\d+)\s/, "$1" + divider);
      }

      if (isNaN(Number(value.replace(divider, '')))) {
        return;
      }

      this.setState({
        value: value
      }, function () {
        return _this2.storeValue(value);
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      var newVal = this.storeValue(e.target.value);
      this.setState({ value: newVal });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'storeValue',
    value: function storeValue(value) {
      value = String(value).replace(divider, '.');
      var newVal = Number(value);

      if (value === '') {
        return this.props.onChange(null);
      }

      if (this.props.digits != undefined) {
        newVal = parseFloat(
        // String(newVal).match(new RegExp("^-?\\d+(?:\\.\\d{0," +this.props.digits+ ")?"))[0]
        String(newVal).match(new RegExp("^-?\\d+(?:\\.\\d{0," + this.props.digits + "})?"))[0]);
      }

      if (value == newVal) {
        this.props.onChange(newVal);
      }

      return newVal;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      var value = this.state.value;


      if (value === null || value === undefined) {
        value = '';
      }

      return _react2.default.createElement('input', _extends({
        ref: 'input',
        className: 'form-control'
      }, props, {
        type: 'text',
        onBlur: this.onBlur,
        onChange: this._onChange,
        value: value
      }));
    }
  }]);

  return NumberInput;
}(_react2.default.Component);

NumberInput.propTypes = {
  // count numbers after dot(comma)
  digits: _react2.default.PropTypes.number
};

exports.default = NumberInput;