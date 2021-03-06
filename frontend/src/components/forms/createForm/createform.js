import React, { Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Form, Input, Button, Alert, Row, Col, Spin, Divider } from "antd";
import { ac_createForm } from "../createForm/action";
import { reset } from "../../common/action";
import { CREATE_FORM_RESET } from "../types";
import { Redirect, withRouter } from "react-router-dom";
import { URL_FORMS_EDIT } from "../../common/url";
import EditForm from "../editForm/editform";
import { ac_fetchFormDetails } from "../common/action";
import { ac_updateForm } from "../editForm/action";
import "react-form-builder2/dist/app.css";
import { UPDATE_FORM_RESET, FORM_DETAILS_RESET } from "../types";

var FormBuilder = require("react-form-builder2");

/* CreateForm is used to construct a dynamic form.
when a form is created it just take form friendly name as input and
fields needs to be created with editform component */

function CreateOrUpdateForm({ props, form }) {
  // const { match } = props;
  // let { id } = null; //match.params;
  let id = null;
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const createForm = useSelector(state => state.createForm);
  const fetchFormDetails = useSelector(state => state.fetchFormDetails);
  const updateForm = []; //useSelector(state => updateForm);
  let form_fields = [];

  if (id) {
    dispatch(ac_fetchFormDetails(id));
  }

  useEffect(
    () => () => {
      dispatch(UPDATE_FORM_RESET);
      dispatch(FORM_DETAILS_RESET);
    },
    []
  );

  const createFormRules = {
    form_name: [
      {
        required: true,
        message: "Please input form name!"
      }
    ]
  };

  var items = [
    {
      key: "TextInput",
      canHaveAnswer: true,
      name: "Text Input",
      label: "Placeholder Label",
      icon: "fa fa-font",
      field_name: "text_input_"
    },
    {
      key: "Dropdown",
      canHaveAnswer: true,
      name: "Dropdown",
      icon: "fa fa-caret-square-o-down",
      label: "Placeholder Label",
      field_name: "dropdown_",
      options: []
    },
    {
      key: "TextArea",
      canHaveAnswer: true,
      name: "Multi-line Input",
      label: "Placeholder Label",
      icon: "fa fa-text-height",
      field_name: "text_area_"
    },
    {
      key: "Checkboxes",
      canHaveAnswer: true,
      name: "Checkboxes",
      icon: "fa fa-check-square-o",
      label: "Placeholder Label",
      field_name: "checkboxes_",
      options: []
    },
    {
      key: "DatePicker",
      canDefaultToday: true,
      canReadOnly: true,
      dateFormat: "MM/dd/yyyy",
      timeFormat: "hh:mm aa",
      showTimeSelect: false,
      showTimeSelectOnly: false,
      name: "Date",
      icon: "fa fa-calendar",
      label: "Placeholder Label",
      field_name: "date_picker_"
    },
    {
      key: "Signature",
      canReadOnly: true,
      name: "Signature",
      icon: "fa fa-pencil-square-o",
      label: "Signature",
      field_name: "signature_"
    }
  ];

  const setFormFields = e => {
    form_fields = e.task_data;
  };

  const saveForm = (e, id) => {
    id
      ? dispatch(
          ac_updateForm(id, { form_fields: JSON.stringify(form_fields) })
        )
      : dispatch(ac_createForm({ form_fields: JSON.stringify(form_fields) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(ac_createForm(values));
      }
    });
  };

  if (createForm.form) {
    return (
      <Redirect to={URL_FORMS_EDIT + "/" + createForm.form.id.toString()} />
    );
  }

  return (
    <Fragment>
      {createForm.isError && (
        <Alert
          message="Form creation failed"
          description={createForm.isError}
          type="error"
          closable
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {form.getFieldDecorator("form_name", {
            rules: createFormRules.form_name
          })(
            <Input
              placeholder="Form name"
              defaultValue={
                fetchFormDetails.form && fetchFormDetails.form.form_name
              }
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={createForm.isLoading}
            htmlType="submit"
          >
            {createForm.isLoading ? "Loading" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      <Row className="form-section">
        <Col xs={24} sm={24} md={24} lg={24}>
          {/* first check if new fields are added if yes then display form_fields else display existing fields using form_details.form.form_fields and if existing fields are null pass empty array */}
          <Button
            type="primary"
            className="pull-right"
            loading={updateForm.isLoading}
            onClick={e => {
              saveForm(e, fetchFormDetails.form.id);
            }}
          >
            {updateForm.isLoading ? "Loading" : "Save"}
          </Button>
          {
          setFormFields({
            task_data:
              fetchFormDetails.length > 0 ? fetchFormDetails.form.form_fields
              ? JSON.parse(fetchFormDetails.form.form_fields)
              : []
              : form_fields
                
          })}
          <FormBuilder.ReactFormBuilder
            task_id={fetchFormDetails.length > 0 && fetchFormDetails.form.id}
            data={form_fields}
            onPost={setFormFields}
            toolbarItems={items}
          />
        </Col>
      </Row>
      )}
    </Fragment>
  );
}

const CreateFormApp = Form.create({ name: "createfrom" })(CreateOrUpdateForm);
export default CreateFormApp;
