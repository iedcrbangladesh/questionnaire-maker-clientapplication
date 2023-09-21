import React, { useState,Fragment, useEffect } from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {AnswerType,ArrayType} from '../../../components/question/Types';
import Link from 'next/link';

import { useRouter } from 'next/router';
import useRequest from '../../../hooks/use-request';
import axios from 'axios';
import TextArea from '../../../components/TextArea';

const url = process.env.URL;


const CreateQuestion = ()=>{

    
    const [showarrayvalues, setShowarrayvalues] = useState(false);
    const [section, setSection] = useState([]);
    const router = useRouter()
    const { qrid } = router.query;

    const fetchSection = async()=>{
        const response = await axios.get(url+'section-list/'+qrid)
        if(response.data.section){
            setSection(response.data.section)
        }
    }

    useEffect(()=>{
        fetchSection()
    },[])
  
    //console.log(section)
    const question = {
        validation_rules:'',
        question_order:0,
        question_label:'',
        label:'',
        error_label:'',
        variable:'',
        type:'',
        value:null,
        options:[],
        custom_attributes:[],
        section_id:'',
        instruction:'',        
        q_id:qrid
    };
    const option_entry = {
        value:'',
        label:''
    };

    const custom_attributes_entry ={
        value:'',
        label:'',
    }

    const [data, setData] = useState(question);

    const { doRequest, errors } = useRequest({
        url: url+'question',
        method: 'post',
        body: data,
        onSuccess: () => {
            router.push('/question/'+qrid);
        },
    });
    


      const handleSubmit =(values)=>{
        //console.log(values);
        //setData(values.question);
        //alert(JSON.stringify(data,2));
        doRequest(values.question);
      };


    return(
        <Fragment>
            <table className='table table-bordered'>
            <tr>
                <td>
                    <Link href="/questionnaire">
                        List Questionaarie
                    </Link>
                </td>
                <td>
                <Link href={`/question/${qrid}`}>
                    List Question
                </Link>
                </td>
            </tr>
            <tr>
                <th colSpan={2}>
                    Create Question for Questionaarie {qrid}
                </th>
            </tr>
            </table>
            <Formik
            initialValues={{ question }}

            onSubmit={handleSubmit}
            render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
                <div>
                <Form>
                           
                            <label htmlFor="question">Serial label of question</label>
                           <Field className='form-control' name={`question.question_label`} placeholder='questions serial label' />
                           
                           <label htmlFor="question">Label Of Question</label>
                           <Field className='form-control' name={`question.label`} placeholder='questions label' />

                           <label htmlFor="question">Error Label of Question </label>
                           <Field className='form-control' name={`question.error_label`} placeholder='questions error label' />
                           
                           <label htmlFor="question">Variable name</label>
                           <Field className='form-control' name={`question.variable`} placeholder='questions variable name' />


                           <label htmlFor="question.question_order">Sort Order</label>
                    <Field type="number" min="0" className='form-control' name={`question.question_order`} placeholder='Sort Order' />
                           
<div className='border border-primary p-2 mt-2'>
                           <label>Answer Type </label>                       
                           <Field className="form-control" as="select" name="question.type" onChange={(e) => { 
                                     //console.log('Value', e.target.value);
                                     const type = e.target.value;
                                     if(ArrayType.includes(type)){
                                        setShowarrayvalues(true);
                                     }else{
                                        setShowarrayvalues(false);
                                     }
                                    
                                     

                                     setFieldValue('question.type', type);



                           }}>
                                <option value="">(Select Type)</option>
                                {AnswerType.map((type, i)=>{
                                    return (
                                        <option key={i} value={type.value}>{type.title}</option>
                                    )
                                })}
                           </Field>
                           <div className='border border-primary p-2 mt-2'>
                           <label>Custom Attributes</label>
                           <FieldArray className='form-control'
                name="question.custom_attributes"
                render={arrayHelpers=>(
                    <table>
                        <th>SL</th>
                        <th>Label</th>
                        <th>Values</th>
                        <th colSpan={2}>Actions</th>
{ values.question.custom_attributes && values.question.custom_attributes.length > 0 ?(

    values.question.custom_attributes.map((option, index)=>(
        <tr key={index}>
            <th>{index+1}</th>
            <td>
            <Field className="form-control" name={`question.custom_attributes[${index}].label`} placeholder='attribute text' />
            </td>
            <td>
            <Field className="form-control" name={`question.custom_attributes[${index}].value`} placeholder='attributes values' />
            </td>
            <td>
            <button type="button"
            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
            >
            -
            </button>
            </td>
            <td>
            <button type="button"
                onClick={() => arrayHelpers.insert(index+1, custom_attributes_entry)} // insert an empty string at a position
            >
            +
            </button>
            </td>

        </tr>
        
    ))
    
)
    :(<button className='btn btn-success' type="button" onClick={() => arrayHelpers.push(custom_attributes_entry)}>
        Add a attribute
    </button>)
                                

}

</table>
                )} />
                           
                            </div>
                           {
                            showarrayvalues &&
                            <div className='border border-primary p-2 mt-2'>
                            <label>Options</label>    
                            <FieldArray className='form-control'
                name="question.options"
                render={arrayHelpers=>(
                    <table>
                        <th>SL</th>
                        <th>Label</th>
                        <th>Values</th>
                        <th colSpan={2}>Actions</th>
{ values.question.options && values.question.options.length > 0 ?(

    values.question.options.map((option, index)=>(
        <tr key={index}>
            <th>{index+1}</th>
            <td>
            <Field className="form-control" name={`question.options[${index}].label`} placeholder='label text' />
            </td>
            <td>
            <Field className="form-control" name={`question.options[${index}].value`} placeholder='label values' />
            </td>
            <td>
            <button type="button"
            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
            >
            -
            </button>
            </td>
            <td>
            <button type="button"
                onClick={() => arrayHelpers.insert(index+1, option_entry)} // insert an empty string at a position
            >
            +
            </button>
            </td>

        </tr>
        
    ))
    
)
    :(<button className='btn btn-success' type="button" onClick={() => arrayHelpers.push(option_entry)}>
        Add a option
    </button>)
                                

}

</table>
                )} />
                </div>
                           }
</div>
<label>Section </label>                      
                           <Field className="form-control" as="select" name="question.section_id">
                                <option value="">(Select Section)</option>
                                {section.map((type, i)=>{
                                    return (
                                        <option key={i} value={type.id}>{type.label}</option>
                                    )
                                })}
                           </Field>
                           
                           <label htmlFor="question">Validation Rules</label>
                           
                           <TextArea name="question.validation_rules"
                placeholder="Validation rules"
                rows="3"
                className="form-control" 
                />

<label htmlFor="question">Enabled Rules</label>
                           
                           <TextArea name="question.enabled_rules"
                placeholder="Enabled Rules"
                rows="3"
                className="form-control" 
                />

<label htmlFor="question">Question instruction</label>
                           
                           <TextArea name="question.instruction"
                placeholder="Question instruction "
                rows="3"
                className="form-control" 
                />


                           <div style={{ marginTop:'5px' }}>
                            <button className='btn btn-primary' type="submit">Submit</button>
                           </div>

                           

                </Form>
                <code>
            <pre>Data: {JSON.stringify(values, null, 2)}</pre>
        </code>
                <code>
                        <pre>Submit Values: {JSON.stringify(data, null, 2)}</pre>
                            </code>
                
                </div>

            )}
            
                
            
            />
        
        
        </Fragment>
    );

};
/*
export async function getServerSideProps() {

    return { props: { url:process.env.URL } }
  
    
  }
*/
export default CreateQuestion;