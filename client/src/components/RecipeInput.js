import React,{ useState,useRef,useEffect} from 'react'
import { Grommet } from 'grommet';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import RecipeDisplay from './RecipeDisplay';
import { useNavigate } from 'react-router-dom'; 
import { useCookies } from "react-cookie";
import axios from 'axios';
import DropdownRadioHelper from '../aesthetics/DropdownRadioHelper';
export default function RecipeInput({onInputTypeChange}) {
    const [inputs, setInputs] = useState([{ ingredients: '' }]);
    const [NER, setNER]=useState([]);
    const lastInputRef = useRef(null);
    const [cookies, removeCookie] = useCookies([]);
    const [searchOption,setSearchOption]=useState("Ingredients");
    const [title,setTitle]=useState('');
    const navigate = useNavigate(); 

    const handleInputChange = (newValue) => {
      setSearchOption(newValue);
    };
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
    navigate('/recipe-display', { state: { NER: filteredNER,Title:"",searchOption:searchOption } });
  };

 const handleGetRecipeByTitle=(event)=>{
  event.preventDefault();
  navigate('/recipe-display', { state: { NER:[],title: title,searchOption:searchOption } });

 } 

  const handleDeleteInput = (index) => {    
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };


  return (
    <div >  
        <Form onSubmit={(event) => event.preventDefault()}>
        <div className="relative isolate px-3 pt-12 lg:px-8">
          
          {searchOption=="Ingredients" ?(
          inputs.map((item, index) => (
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
          ))
          ):(
              <div>
                 <FormField name={`Title`} label={`Title`}>
                <TextInput
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Tell us what your recipe is called?"
                
                />

              </FormField>
              <Button onClick={handleGetRecipeByTitle} label="Get Recipe" />

              </div>
          )}
          
          <DropdownRadioHelper onTypeChange={onInputTypeChange} onInputChange={handleInputChange} />
         
        </div>
      </Form>
      </div>
  )
}
