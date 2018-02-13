import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';

import { getCollectionDataFromBackend } from '../utils';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
    }

    componentDidMount() {
        return getCollectionDataFromBackend(`/api/collections/${this.props.match.params.collectionName}/${this.props.match.params.subCollectionName}?option=${this.props.match.params.option}`)
            .then((resData) => {
                this.setState({ records: resData });
            });
    }

    render() {
        return (
            < Container >
                <Alert color="primary">
                    This is a primary alert — check it out!
                </Alert>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem active>Home</BreadcrumbItem>
                        </Breadcrumb>
                        <Breadcrumb>
                            <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                            <BreadcrumbItem active>Library</BreadcrumbItem>
                        </Breadcrumb>
                        <Breadcrumb>
                            <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                            <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                            <BreadcrumbItem active>Data</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>{this.props.match.params.collectionName}</Col>
                </Row>
                <Row>
                    <Col>{this.props.match.params.subCollectionName}</Col>
                </Row>
                <Row>
                    <Col>{this.props.match.params.option}</Col>
                </Row>
                <Row>
                    <Col>{JSON.stringify(this.state.records)}</Col>
                </Row>
            </Container >

        );
    }

}

Edit.propTypes = {
    match: PropTypes.object
};
Edit.defaultProps = {
    match: {
        params: {
            collectionName: '',
            subCollectionName: '',
            option: ''
        }
    }
};
