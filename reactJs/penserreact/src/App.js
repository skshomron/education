import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <FilterableProductTable data={PRODUCTS}/>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class ProductRow extends React.Component{  
  render(){
    const elt = this.props.stocked===true? <tr><td>{this.props.name }</td><td>{this.props.price}</td></tr>:
    <tr><td style={{color: 'red'}}>{this.props.name }</td><td>{this.props.price}</td></tr>;
    return elt; 
  }
}

class ProductCategoryRow extends React.Component{
  render(){
    return (
      <tr><td colSpan="2">{this.props.category}</td></tr>
    );
  }
}

class ProductTable extends React.Component{
  render(){ 
    return(
    <table>
       <thead>
      <tr><th>Name</th><th>Price</th></tr>   
      </thead>
      <tbody>
        {
        this.renderProducts()
        }    
        </tbody>  
    </table>);
  }

  renderProducts(){
    debugger;

    const categories= new Set(this.props.data.map(x=>x.category));
    const products=[];
    for(let category of categories){
      products.push(
        <ProductCategoryRow key={category} category={category}> </ProductCategoryRow>
      );
      for(let product of this.props.data){
        if(product.category === category){
          products.push(
          <ProductRow  key={product.name} stocked={product.stocked} name={product.name} price={product.price}></ProductRow>
          )
        }
      }
    }
    return products;
  }
}

class SearchBar extends React.Component{
  constructor(props){
    super(props);    
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    this.onOnlyInStockChanged = this.onOnlyInStockChanged.bind(this);
  }

  onSearchTextChanged(e){
    this.props.onSearchTextChanged(e.target.value);
  }

  onOnlyInStockChanged(e){
    this.props.onOnlyInStockChanged(e.target.checked);
  }

  render(){
    return (
    <form>
      <div >
        <label>
        Search: 
        <input type="Text" name="search" onChange={(e)=>this.onSearchTextChanged(e)}></input>
      </label>
      </div>
      <div>
      <label>
          <input type="checkbox" name="onlyInStock" onChange={(e)=>this.onOnlyInStockChanged(e)}></input>
          Only in stock:
      </label>
      </div>
    </form> );   
  }
}

class FilterableProductTable extends React.Component{  
  constructor(props){
    super(props);
    this.state={
      searchText:"",
      onlyInStock:false,      
    };
  }
  onSearchTextChanged(newtext){
      this.setState({searchText:newtext});    
  }
  onOnlyInStockChanged(isInStock){    
      this.setState({onlyInStock:isInStock});    
  }
  render(){
    debugger;
    let data = [];
    const searchText = this.state.searchText;
    if(searchText.length === 0){
      data = PRODUCTS.map(x=>x);
    }
    else{
      for (const prod of PRODUCTS) {
        if(prod.name.includes(searchText)){
          data.push(prod);
        }        
      }
    }

    let finalData = [];
    const onlyInStock = this.state.onlyInStock;
    if(onlyInStock === false){
      finalData = data;
    }else{
      for (const prod of data) {
        if(prod.stocked){
          finalData.push(prod);
        }
      }
    }
    return (
    <div>
      <SearchBar searchText={this.state.searchText}
       onlyInStock={this.state.onlyInStock}
       onSearchTextChanged={(newtext)=>this.onSearchTextChanged(newtext)}  
       onOnlyInStockChanged={(isInStock)=>this.onOnlyInStockChanged(isInStock)}></SearchBar>
       <ProductTable data={finalData}></ProductTable>
    </div>);
  }

}

const PRODUCTS=[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


export default App;
