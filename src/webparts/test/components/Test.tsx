import * as React from 'react';
//import styles from './Test.module.scss';
import './App.css';
import { ITestProps } from './ITestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { render } from 'react-dom';


interface Myprop {
  string: string;
}
export default class Test extends React.Component<Myprop, any> {
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      equation: ""
    }
    this.numInput = this.numInput.bind(this);
    this.operInput = this.operInput.bind(this);
    this.decInput = this.decInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    //this.calculate = this.calculate.bind(this);
  }

public  numInput(e){
    if(this.state.equation.match(/[0-9\.\(\)%]$/) && !this.state.equation.includes("=")){
      if(this.state.equation.match(/[+\-*\/\(\)%]/) == null){
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val
        });
      } else {
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value
        });
      }
    } else if(this.state.equation.match(/[+\-*\/\(\)%]$/)){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if(this.state.display === "0" && e.currentTarget.value !== "0" || this.state.equation.includes("=")) {
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    }
  }


 public operInput(e){
    if(this.state.equation.includes("=")){
      let val = this.state.display;
      val += e.currentTarget.value;
      this.setState({
        equation: val
      });
    } else {
      if(this.state.equation != "" && this.state.equation.match(/[*\-\/+\(\)]$/) == null){
        let val = this.state.equation;
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      } else if(this.state.equation.match(/[*\-\/+\(\)]$/) != null){ // check if double operand has entered
        let val = this.state.equation;
        let pval= val.substring(val.length, 1);
        //alert(pval);
        if(pval.match(/[*\-\/+\(\)]$/)){
          //check if its an operand
          val = val+'('+pval;

        }else{

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
  }

 public decInput(e){
    if(this.state.equation == "" || this.state.equation.includes("=")){
      let val = '0.';
      this.setState({
        display: val,
        equation: val
      });
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = '0.';
      this.setState({
        display: val,
        equation: this.state.equation + val
      });
    } else if(!this.state.display.includes(".")){
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value
      });
    }
  }

 public clearInput=()=>{
    this.setState({
      display: "0",
      equation: ""
    });
  }

  public getPercent=(e)=>{
    let displayl =this.state.display.toString.length;
    let result =  this.state.display/100;
    let eq = this.state.equation ;


eq=eq.substring(-1);
/*
alert('result='+ result);
alert('display'+ displayl);
*/
  this.setState({
    display: result,
    equation: " "+result
  });


}




  public calculate=()=>{

/*
    this.setState({
     display:1000
    });
*/




    if(this.state.equation.includes("=")){
      let val = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: val
      });
    } else if(this.state.equation != "" && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/) == null) {
      let result = parseInt(this.state.equation,10) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
      let val = this.state.equation;
      val += ` = ${result}`;
      this.setState({
        display: result,
        equation: val
      });
    }

  }


public opBrackets=()=>{

  this.setState({
    equation: this.state.equation+'(',
  });
}

public clBrackets=()=>{

  this.setState({
    equation: this.state.equation+')',
  });
}

  public render(): React.ReactElement<Myprop,any> {

    return (



      <div className="container">
          <p>Calculators</p>
      <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{this.state.equation}</span><span id="dis">{this.state.display}</span></div>

        <button id='opbrack' value='(' className='row-3 col-1' onClick={this.opBrackets} > (</button>
        <button id='clbrack' value=')'  className='row-3 col-2' onClick={this.clBrackets}>) </button>
        <button id='percent' value='%'  className='oper row-3 col-3'onClick={this.getPercent}>% </button>
        <button id='clear' className='row-3 col-4' onClick={this.clearInput} >AC</button>
        <button id='seven' value='7'  className='num row-4 col-1' onClick={this.numInput} >7</button>
        <button id='eight' value='8'  className='num row-4 col-2' onClick={this.numInput} >8</button>
        <button id='nine' value='9'  className='num row-4 col-3' onClick={this.numInput} >9</button>
        <button id='divide' value='/'  className='oper row-4 col-4' onClick={this.operInput} >/ </button>
        <button id='multiply' value='*'  className='oper row-5 col-4' onClick={this.operInput}>x</button>
        <button id='four' value='4'  className='num row-5 col-1' onClick={this.numInput} >4</button>
        <button id='five' value='5'  className='num row-5 col-2' onClick={this.numInput} >5</button>
        <button id='six' value='6'  className='num row-5 col-3' onClick={this.numInput} >6</button>
        <button id='subtract' value='-' className='oper row-6 col-4' onClick={this.operInput} >-</button>
        <button id='one' value='1'  className='num row-6 col-1' onClick={this.numInput}> 1</button>
        <button id='two' value='2'  className='num row-6 col-2' onClick={this.numInput} >2</button>
        <button id='three' value='3'  className='num row-6 col-3' onClick={this.numInput} >3</button>
        <button id='add' value='+'  className='oper row-7 col-4' onClick={this.operInput} >+</button>
        <button id='zero' value='0'  className='num row-7 col-1' onClick={this.numInput} >0</button>
        <button id='decimal' value='.' className='num row-7 col-2' onClick={this.decInput} >.</button>
        <button id='equals' value='='  className='eql row-7 col-3' onClick={this.calculate}>=</button>
  </div>



    );
  }

  }
