var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
//import styles from './Test.module.scss';
import './App.css';
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test(props) {
        var _this = _super.call(this, props) || this;
        _this.clearInput = function () {
            _this.setState({
                display: "0",
                equation: ""
            });
        };
        _this.getPercent = function (e) {
            var displayl = _this.state.display.toString.length;
            var result = _this.state.display / 100;
            var eq = _this.state.equation;
            eq = eq.substring(-1);
            /*
            alert('result='+ result);
            alert('display'+ displayl);
            */
            _this.setState({
                display: result,
                equation: " " + result
            });
        };
        _this.calculate = function () {
            /*
                this.setState({
                 display:1000
                });
            */
            if (_this.state.equation.includes("=")) {
                var val = _this.state.display + " = " + _this.state.display;
                _this.setState({
                    equation: val
                });
            }
            else if (_this.state.equation != "" && _this.state.equation.match(/[+\-*\/]/) != null && _this.state.equation.match(/[+\-*\/]$/) == null) {
                var result = parseInt(_this.state.equation, 10) ? eval(_this.state.equation) : parseFloat(eval(_this.state.equation).toFixed(5));
                var val = _this.state.equation;
                val += " = " + result;
                _this.setState({
                    display: result,
                    equation: val
                });
            }
        };
        _this.opBrackets = function () {
            _this.setState({
                equation: _this.state.equation + '(',
            });
        };
        _this.clBrackets = function () {
            _this.setState({
                equation: _this.state.equation + ')',
            });
        };
        _this.state = {
            display: "0",
            equation: ""
        };
        _this.numInput = _this.numInput.bind(_this);
        _this.operInput = _this.operInput.bind(_this);
        _this.decInput = _this.decInput.bind(_this);
        _this.clearInput = _this.clearInput.bind(_this);
        return _this;
        //this.calculate = this.calculate.bind(this);
    }
    Test.prototype.numInput = function (e) {
        if (this.state.equation.match(/[0-9\.\(\)%]$/) && !this.state.equation.includes("=")) {
            if (this.state.equation.match(/[+\-*\/\(\)%]/) == null) {
                var val = this.state.equation + e.currentTarget.value;
                this.setState({
                    display: val,
                    equation: val
                });
            }
            else {
                this.setState({
                    display: this.state.display + e.currentTarget.value,
                    equation: this.state.equation + e.currentTarget.value
                });
            }
        }
        else if (this.state.equation.match(/[+\-*\/\(\)%]$/)) {
            var val = this.state.equation + e.currentTarget.value;
            this.setState({
                display: e.currentTarget.value,
                equation: val
            });
        }
        else if (this.state.display === "0" && e.currentTarget.value !== "0" || this.state.equation.includes("=")) {
            this.setState({
                display: e.currentTarget.value,
                equation: e.currentTarget.value
            });
        }
    };
    Test.prototype.operInput = function (e) {
        if (this.state.equation.includes("=")) {
            var val = this.state.display;
            val += e.currentTarget.value;
            this.setState({
                equation: val
            });
        }
        else {
            if (this.state.equation != "" && this.state.equation.match(/[*\-\/+\(\)]$/) == null) {
                var val = this.state.equation;
                val += e.currentTarget.value;
                this.setState({
                    equation: val
                });
            }
            else if (this.state.equation.match(/[*\-\/+\(\)]$/) != null) { // check if double operand has entered
                var val = this.state.equation;
                var pval = val.substring(val.length, 1);
                //alert(pval);
                if (pval.match(/[*\-\/+\(\)]$/)) {
                    //check if its an operand
                    val = val + '(' + pval;
                }
                else {
                }
                /*
                val = val.substring(0, (val.length-0)); // -1 to prevent 2--2.
                val += e.currentTarget.value;
                */
                this.setState({
                    equation: val
                });
            }
        }
    };
    Test.prototype.decInput = function (e) {
        if (this.state.equation == "" || this.state.equation.includes("=")) {
            var val = '0.';
            this.setState({
                display: val,
                equation: val
            });
        }
        else if (this.state.equation.match(/[+\-*\/]$/)) {
            var val = '0.';
            this.setState({
                display: val,
                equation: this.state.equation + val
            });
        }
        else if (!this.state.display.includes(".")) {
            this.setState({
                display: this.state.display + e.currentTarget.value,
                equation: this.state.equation + e.currentTarget.value
            });
        }
    };
    Test.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement("p", null, "Calculators"),
            React.createElement("div", { id: "calc-display", className: "row-1-2 col-1-4" },
                React.createElement("span", { id: "eq" }, this.state.equation),
                React.createElement("span", { id: "dis" }, this.state.display)),
            React.createElement("button", { id: 'opbrack', value: '(', className: 'row-3 col-1', onClick: this.opBrackets }, " ("),
            React.createElement("button", { id: 'clbrack', value: ')', className: 'row-3 col-2', onClick: this.clBrackets }, ") "),
            React.createElement("button", { id: 'percent', value: '%', className: 'oper row-3 col-3', onClick: this.getPercent }, "% "),
            React.createElement("button", { id: 'clear', className: 'row-3 col-4', onClick: this.clearInput }, "AC"),
            React.createElement("button", { id: 'seven', value: '7', className: 'num row-4 col-1', onClick: this.numInput }, "7"),
            React.createElement("button", { id: 'eight', value: '8', className: 'num row-4 col-2', onClick: this.numInput }, "8"),
            React.createElement("button", { id: 'nine', value: '9', className: 'num row-4 col-3', onClick: this.numInput }, "9"),
            React.createElement("button", { id: 'divide', value: '/', className: 'oper row-4 col-4', onClick: this.operInput }, "/ "),
            React.createElement("button", { id: 'multiply', value: '*', className: 'oper row-5 col-4', onClick: this.operInput }, "x"),
            React.createElement("button", { id: 'four', value: '4', className: 'num row-5 col-1', onClick: this.numInput }, "4"),
            React.createElement("button", { id: 'five', value: '5', className: 'num row-5 col-2', onClick: this.numInput }, "5"),
            React.createElement("button", { id: 'six', value: '6', className: 'num row-5 col-3', onClick: this.numInput }, "6"),
            React.createElement("button", { id: 'subtract', value: '-', className: 'oper row-6 col-4', onClick: this.operInput }, "-"),
            React.createElement("button", { id: 'one', value: '1', className: 'num row-6 col-1', onClick: this.numInput }, " 1"),
            React.createElement("button", { id: 'two', value: '2', className: 'num row-6 col-2', onClick: this.numInput }, "2"),
            React.createElement("button", { id: 'three', value: '3', className: 'num row-6 col-3', onClick: this.numInput }, "3"),
            React.createElement("button", { id: 'add', value: '+', className: 'oper row-7 col-4', onClick: this.operInput }, "+"),
            React.createElement("button", { id: 'zero', value: '0', className: 'num row-7 col-1', onClick: this.numInput }, "0"),
            React.createElement("button", { id: 'decimal', value: '.', className: 'num row-7 col-2', onClick: this.decInput }, "."),
            React.createElement("button", { id: 'equals', value: '=', className: 'eql row-7 col-3', onClick: this.calculate }, "=")));
    };
    return Test;
}(React.Component));
export default Test;
//# sourceMappingURL=Test.js.map