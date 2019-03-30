import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
//import uuid from "uuid";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  handleFormChange = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = res.data;

    this.setState({
      name,
      email,
      phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({
        errors: { name: "Name is required!" }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: { email: "Email is required!" }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: { phone: "Phone is required!" }
      });
      return;
    }

    const { id } = this.props.match.params;

    const updContact = {
      name,
      email,
      phone
    };

    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: response.data });

    this.setState({ name: "", email: "", phone: "", errors: {} });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="enter name..."
                    value={name}
                    onChange={this.handleFormChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="enter email..."
                    value={email}
                    onChange={this.handleFormChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="enter phone..."
                    value={phone}
                    onChange={this.handleFormChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-dark btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
