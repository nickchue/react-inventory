import React from 'react';
import ReactDom from 'react-dom';
import { Container, Form, Input, Checkbox, Table, Divider } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { products } from './data.js';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;

    return (
      <Table.Row>
        <Table.Cell colSpan='2'>
          <strong>{category}</strong>
        </Table.Cell>
      </Table.Row>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{ color:'red' }}>{product.name}</span>;

    return (
      <Table.Row>
        <Table.Cell>
          {name}
        </Table.Cell>
        <Table.Cell>
          {product.price}
        </Table.Cell>
      </Table.Row>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    for(let product of this.props.products) {
      // Filter Product
      if(product.name.indexOf(filterText) === -1) {
        continue;
      }
      if(inStockOnly && !product.stocked) {
        continue;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      )
      lastCategory = product.category;
    }

    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Price
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isInStockOnlyChecked: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  handleInStockOnlyChange() {
    this.setState({
      isInStockOnlyChecked: !this.state.isInStockOnlyChecked
    });
    this.props.onInStockOnlyChange(!this.state.isInStockOnlyChecked);
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Input placeholder={this.props.filterText} onChange={this.handleFilterTextChange} />
          </Form.Field>
          <Form.Field>
            <Checkbox name="inStockOnly" toggle label='Show Only In Stock Products'
              onChange={this.handleInStockOnlyChange} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText
    });
  }

  handleInStockOnlyChange(inStockOnly) {
    this.setState({
      inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          inStockOnly={this.state.inStockOnly}
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockOnlyChange={this.handleInStockOnlyChange} />
        <Divider horizontal></Divider>
        <ProductTable
          inStockOnly={this.state.inStockOnly}
          filterText={this.state.filterText}
          products={this.props.products} />
      </div>
    )
  }
}

ReactDom.render(
  <div>
    <Container textAlign='center'>
      <FilterableProductTable products={products} />
    </Container>
  </div>
  ,
  document.getElementById('root')
);
