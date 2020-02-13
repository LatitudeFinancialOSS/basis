import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FormPage() {
  const code = formatCode(`
    function App() {
      const hungryOptions = [
        {
          label: "Yes",
          value: "yes"
        },
        {
          label: "No",
          value: "no"
        },
        {
          label: "Maybe",
          value: "maybe"
        }
      ];
      const relationshipOptions = [
        {
          label: "Single",
          value: "single"
        },
        {
          label: "Married",
          value: "married"
        },
        {
          label: "Other",
          value: "other"
        }
      ];
      const formRef = React.useRef();
      const [name, setName] = React.useState({
        value: ""
      });
      const [likeIceCream, setLikeIceCream] = React.useState({
        value: false
      });
      const [age, setAge] = React.useState({
        value: {
          years: "",
          months: ""
        }
      });
      const [weddingDate, setWeddingDate] = React.useState({
        value: {
          day: "",
          month: "",
          year: ""
        }
      });
      const [salary, setSalary] = React.useState({
        value: {
          input: "",
          frequency: ""
        }
      });
      const [hungry, setHungry] = React.useState({
        value: ""
      });
      const [relationshipStatus, setRelationshipStatus ] = React.useState({
        value: ""
      });
      const [formError, setFormError] = React.useState(null);
      const onSubmit = e => {
        e.preventDefault();

        const errorsCount = formRef.current.validateForm();

        if (errorsCount === 0) {
          setFormError(null);

          const data = {
            name: name.value,
            likeIceCream: likeIceCream.value,
            relationshipStatus: relationshipStatus.value,
            hungry: hungry.value,
            age: age.value,
            salary: salary.value,
            weddingDate: weddingDate.value
          };
      
          console.log("Submitting:", JSON.stringify(data, null, 2));
        } else {
          setFormError(\`Please fix the \${errorsCount} \${
    errorsCount === 1 ? "error" : "errors"
  } above.\`);
        }
      };
    
      return (
        <Container padding="8">
          <Form onSubmit={onSubmit} ref={formRef}>
            <Grid rowsGutter="8">
              <Text as="h2" textStyle="heading4">About you</Text>
              <Input label="Name" data={name} onChange={setName} />
              <Checkbox helpText="You MUST like it!" data={likeIceCream} onChange={setLikeIceCream}>I like ice cream</Checkbox>
              <Select label="Relationship status" options={relationshipOptions} data={relationshipStatus} onChange={setRelationshipStatus} />
              <RadioGroup label="Are you hungry?" options={hungryOptions} data={hungry} onChange={setHungry} />
              <TimeSpan label="Age" data={age} onChange={setAge} />
              <Frequency label="Salary" data={salary} onChange={setSalary} />
              <DatePicker label="Wedding date" data={weddingDate} onChange={setWeddingDate} />
              <Button type="submit">Submit</Button>
            </Grid>
            {formError && <Text color="conditional.negative.text" margin="2 0 0 0">{formError}</Text>}
          </Form>
        </Container>
      );
    }
  `);

  return <ComponentContainer code={code} scope={scope} width="sm" />;
}

export default FormPage;
