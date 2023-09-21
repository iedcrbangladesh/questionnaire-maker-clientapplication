import { Component } from 'react';

class Text extends Component {


    render() {
    
       const { 
        name='name' ,
        placeholder='placeholder',
        onChange,
        value
        } = this.props;

      return (
        <div>
        <input type="text" 
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        />
        <br/>
        </div>
      );
    }
}


export default Text;