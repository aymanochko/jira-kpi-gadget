import React, { useState, useEffect } from 'react';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import Button, { ButtonGroup } from '@atlaskit/button/new';
import { view, invoke } from '@forge/bridge';

// Utility function to decode HTML entities (e.g., &eacute; → é)
function decodeHtmlEntities(text) {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Utility function to encode HTML entities (e.g., é → &eacute;)
function encodeHtmlEntities(text) {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.textContent = text;
  return textarea.innerHTML;
}

// Trend options for the select field (French translations)
const trendOptions = [
  { label: 'Hausse', value: 'up' },
  { label: 'Baisse', value: 'down' },
  { label: 'Stable', value: 'stable' },
];

function Edit() {
  const onSubmit = (formData) => {
    // Encode HTML entities before submitting to prevent Jira from double-encoding
    // Handle trend field which is now a Select component (object with label/value)
    const trendValue = formData.trend && typeof formData.trend === 'object' 
      ? formData.trend.value 
      : formData.trend;
    
    const encodedData = {
      label: encodeHtmlEntities(formData.label),
      value: encodeHtmlEntities(formData.value),
      unit: encodeHtmlEntities(formData.unit),
      trend: encodeHtmlEntities(trendValue),
      target: encodeHtmlEntities(formData.target),
    };
    view.submit(encodedData);
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getConfig')
      .then(setData)
      .catch(err => {
        console.error('Failed to load config:', err);
      });
  }, []);

  // Initialize default values for all form fields
  let labelValue = "";
  let valueValue = "";
  let unitValue = "";
  let trendValue = "";
  let targetValue = "";

  if (data) {
    labelValue = decodeHtmlEntities(data["label"]) || "";
    valueValue = decodeHtmlEntities(data["value"]) || "";
    unitValue = decodeHtmlEntities(data["unit"]) || "";
    trendValue = decodeHtmlEntities(data["trend"]) || "";
    targetValue = decodeHtmlEntities(data["target"]) || "";
  }

  // Get the selected option for the trend field
  const selectedTrendOption = trendOptions.find(option => option.value === trendValue) || null;

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <Field name="label" label="Label" defaultValue={labelValue}>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
          <Field name="value" label="Value" defaultValue={valueValue}>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
          <Field name="unit" label="Unit's label" defaultValue={unitValue}>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <br/>
          <Field name="trend" label="Trend" defaultValue={selectedTrendOption}>
            {({ fieldProps }) => (
              <Select
                {...fieldProps}
                options={trendOptions}
                placeholder="Sélectionner une tendance"
              />
            )}
          </Field>
          <br/>
          <Field name="target" label="Target" defaultValue={targetValue}>
            {({ fieldProps }) => <TextField {...fieldProps} />}
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
