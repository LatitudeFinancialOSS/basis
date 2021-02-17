import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FormPage() {
  const code = formatCode(`
    const relationshipStatusOptions = [
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
    const movieOptions = [
      {
        data: {
          name: "Parasite",
          description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
          imageSrc: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY209_CR0,0,140,209_AL_.jpg"
        },
        value: "parasite"
      },
      {
        data: {
          name: "1917",
          description: "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
          imageSrc: "https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_UX140_CR0,0,140,209_AL_.jpg"
        },
        value: "1917"
      },
      {
        data: {
          name: "The Irishman",
          description: "An aging hitman recalls his time with the mob and the intersecting events with his friend, Jimmy Hoffa, through the 1950-70s.",
          imageSrc: "https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_UY209_CR1,0,140,209_AL_.jpg"
        },
        value: "the-irishman"
      },
      {
        data: {
          name: "Chernobyl",
          description: "In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
          imageSrc: "https://m.media-amazon.com/images/M/MV5BZGQ2YmMxZmEtYjI5OS00NzlkLTlkNTEtYWMyMzkyMzc2MDU5XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_UX140_CR0,0,140,209_AL_.jpg"
        },
        value: "chernobyl"
      }
    ];
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

    function MoviePlaceholder() {
      return <Text>Please select a movie</Text>;
    }

    function movieOptionToString({ data }) {
      return data.name
    }

    function MovieOption({ data }) {
      const { name, description, imageSrc } = data
    
      return (
        <Grid cols="80px 1fr" colsGap="4">
          <Grid.Item colSpan="0" rowSpan="0-1">
            <Flex>
              <img src={imageSrc} alt={name} width="100%" />
            </Flex>
          </Grid.Item>
          <Grid.Item colSpan="1" rowSpan="0">
            <Text>
              <strong>{name}</strong>
            </Text>
          </Grid.Item>
          <Grid.Item colSpan="1" rowSpan="1">
            <Text textStyle="body2" color="grey.t75">
              {description}
            </Text>
          </Grid.Item>
        </Grid>
      )
    }

    const initialValues = {
      name: "",
      relationshipStatus: "",
      favouriteMovie: "",
      likeIceCream: false,
      hungry: "",
      salary: {
        amount: "",
        frequency: ""
      },
      birthDate: {
        day: "",
        month: "",
        year: ""
      },
      age: {
        years: "",
        months: ""
      },
      aboutYourself: ""
    };
      
    function App() {
      const onSubmit = ({ errors, values }) => {
        if (Object.keys(errors).length > 0) {
          console.log("Errors:", JSON.stringify(errors, null, 2));
        } else {
          console.log("Submitting:", JSON.stringify(values, null, 2));
        }
      };
    
      return (
        <Container padding="8">
          <Form initialValues={initialValues} onSubmit={onSubmit}>
            <Grid rowsGap="8">
              <Text as="h2" textStyle="heading4">About you</Text>
              <Input name="name" label="Name" />
              <Select name="relationshipStatus" label="Relationship status" options={relationshipStatusOptions} />
              <Dropdown name="favouriteMovie" label="Favourite movie" placeholderComponent={MoviePlaceholder} options={movieOptions} optionToString={movieOptionToString} optionComponent={MovieOption}  />
              <Checkbox label="Do you like ice cream?" hideLabel name="likeIceCream" helpText="You MUST like it!">I like ice cream</Checkbox>
              <RadioGroup name="hungry" label="Are you hungry?" options={hungryOptions} />
              <Frequency name="salary" label="Salary" />
              <DatePicker name="birthDate" label="Birth date" />
              <TimeSpan name="age" label="Age" />
              <Textarea name="aboutYourself" label="Tell us about yourself" height="100" />
              <Button type="submit">Submit</Button>
            </Grid>
          </Form>
        </Container>
      );
    }

    render(<App />);
  `);

  return <ComponentContainer code={code} noInline scope={scope} width="sm" />;
}

export default FormPage;
