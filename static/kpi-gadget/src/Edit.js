import React, { useState, useEffect } from 'react';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { view, invoke } from '@forge/bridge';

function Edit() {
  const onSubmit = (formData) => view.submit(formData);
  const [context, setContext] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getConfig').then(setData);
  }, []);

  let labelValue = "";
  if (data) {
    labelValue = data["label"];
  }
  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field name="label" label="Label" defaultValue={labelValue}>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
          <Field name="value" label="Value">
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
          <Field name="unit" label="Unit's label">
            {({ fieldProps }) => <TextField {...fieldProps}  />}
          </Field>
          <br/>
          <Field name="trend" label="Trend">
            {({ fieldProps }) => <TextField {...fieldProps}  />}
          </Field>
          <br/>
          <Field name="target" label="Target">
            {({ fieldProps }) => <TextField {...fieldProps}  />}
          </Field>
          <br/>
          <ButtonGroup>
            <Button type="submit" isDisabled={submitting}>Save</Button>
            <Button appearance="subtle" onClick={view.close}>Cancel</Button>
          </ButtonGroup>
        </form>
      )}
    </Form>
  );
}

export default Edit;
