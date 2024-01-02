import React, { Component } from 'react';
import axios from 'axios';

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get('/api/products') // Sunucu tarafına istek yapılıyor
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Ürün Listesi</h1>
        <ul>
          {this.state.products.map(product => (
            <li key={product.id}>{product.productName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
