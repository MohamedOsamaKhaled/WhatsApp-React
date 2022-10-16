import React from "react";
import { Input } from "reactstrap";
import moment from "moment";


class MessageForm extends React.Component {

    state = { message: '', lastType: false };


    onChange = e => this.setState({ message: e.target.value });

    onSend = e => {
        if (!this.state.message) return;
        let message = {
            content: this.state.message,
            date: new Date().getTime()
        };
        this.props.sender(message);
        this.setState({ message: '' });
    };


    onKeyDown = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.setState({ lastType: false });
            this.onSend();
            e.preventDefault();
        } else if (!this.state.lastType || moment() - this.state.lastType > 2000) {
            this.setState({ lastType: moment() });
            this.props.sendType();
        }
    };


    render() {
        return (
            <div id="send-message">
                <Input type="textarea" rows="1" onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.message} placeholder="اكتب رسالتك هنا" />
                <i className="fa fa-send text-muted px-3 send" onClick={this.onSend} />
            </div>
        );
    }

}

export default MessageForm;