import React,{ useState,useRef,useEffect} from 'react'
import { Grommet } from 'grommet';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import RecipeDisplay from './RecipeDisplay';
import { useNavigate } from 'react-router-dom'; 

export default function RecipeInput() {
    const [inputs, setInputs] = useState([{ ingredients: '' }]);
    const [NER, setNER]=useState([]);
    const lastInputRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Scrolling to the last added input field
        if (lastInputRef.current) {
          lastInputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return () => {
          if (window.location.pathname === '/') {
            localStorage.removeItem('recipeData');
          }
        };
      }, [inputs]);

  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, { ingredients: '' }]);
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = { ingredients: value };
    //   if (inputs.length>1 && value.trim() === '') {
    //     updatedInputs.pop();
    //   }
      return updatedInputs;
    });
  };

 useEffect(()=>{
     console.log(NER);
     if(NER.length>0)
     {
        navigate('/recipe-display', { state: { NER:NER } });
     }
    },[NER])

const handleGetRecipe = (event) => {
    event.preventDefault();
    const updatedNER = inputs.map((item) => item.ingredients.toLowerCase());
    const filteredNER = updatedNER.filter(item => item !== '');
    setNER(filteredNER);
    navigate('/recipe-display', { state: { NER: filteredNER } });
  };

  const handleDeleteInput = (index) => {    
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };
  return (
    <Grommet >      
    <div className="relative isolate px-3 pt-12 lg:px-8">
        <div
          className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <Form onSubmit={(event) => event.preventDefault()}>
        <div className="relative isolate px-3 pt-12 lg:px-8">
          {inputs.map((item, index) => (
            <React.Fragment key={index}>
              <FormField name={`ingredient-${index}`} label={`Ingredient ${index + 1}`}>
                <TextInput
                  id={`text-input-id-${index}`}
                  value={item.ingredients}
                  onChange={(event) => handleChange(event, index)}
                  placeholder="🥦🍏🍇🥛🌱🧀 Veg, Fruit, Dairy – the more, the better!"
                  ref={(ref) => (index === inputs.length - 1 ? (lastInputRef.current = ref) : null)}
                />
              </FormField>

              <Box direction="row" gap="small">

              {inputs.every((item) => item.ingredients.length > 0) && index === inputs.length - 1 && (
                  <Button onClick={handleAddInput} primary label="+" />
                )}

                {inputs[index].ingredients.length > 0 && index !== inputs.length - 1 && (
                  <Button onClick={() => handleDeleteInput(index)} primary label="-" />
                )}
                {index === inputs.length - 1 && (
                  <Button onClick={handleGetRecipe} label="Get Recipe" />
                )}
              </Box>
            </React.Fragment>
          ))}
          
         
        </div>
      </Form>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >

          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
            className="relative left-[calc(50%-11rem)] aspect-[5000/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
      </div>
    </Grommet>
  )
}
