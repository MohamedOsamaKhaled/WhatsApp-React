import React from "react";
import Contact from "./Contact";
import { Row, Input } from 'reactstrap';

class Contacts extends React.Component {

    state = { search: '' };

    onSearch = e => this.setState({ search: e.target.value });

    render() {
        return (
            <div className="list">
                <Row className="search">
                    <Input onChange={this.onSearch} placeholder="بحث" />
                </Row>
                <Row id="contacts">
                    {this.props.contacts.map((contact, index) => this.renderContact(contact, index))}
                </Row>
            </div>
        );
    }


    renderContact = (contact, index) => {
        if (!contact.name.includes(this.state.search)) return;
        let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
        let lastMessage = messages[messages.length - 1];
        let unseen = messages.filter(e => !e.seen && e.sender === contact.id).length;
        return (
            <div className="w-100" key={index} onClick={this.props.onChatNavigate.bind(this, contact)}>
                <Contact contact={contact} message={lastMessage} unseen={unseen} />
            </div>
        );
    }
}
export default Contacts;
