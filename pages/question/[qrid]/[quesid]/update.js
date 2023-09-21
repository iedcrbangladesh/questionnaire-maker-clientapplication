import React, { useState,Fragment,useEffect, useCallback } from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {AnswerType,ArrayType} from '../../../../components/question/Types';
import Link from 'next/link';

import { useRouter } from 'next/router';
import useRequest from '../../../../hooks/use-request';
import axios from 'axios';
import TextArea from '../../../../components/TextArea';


const url = process.env.URL;
const UpdateQuestion = ({prev_data})=>{

    const showarray = ArrayType.includes(prev_data.type);

    
    const [showarrayvalues, setShowarrayvalues] = useState(showarray);
    const [section, setSection] = useState([]);

    const router = useRouter()
    const { qrid, quesid } = router.query;

    const fetchSection = useCallback(async()=>{
        const response = await axios.get(url+'section-list/'+qrid)
        if(response.data.section){
            setSection(response.data.section)
        }
    },[url,qrid])

    useEffect(()=>{
        fetchSection()
    },[fetchSection])

    
    

    const question = {
        question_order:prev_data.question_order,
        question_label:prev_data.question_label,        
        label:prev_data.label,
        error_label:prev_data.error_label,
        variable:prev_data.variable,
        type:prev_data.type,
        value:prev_data.value,
        options:prev_data.options,
        section_id:prev_data.section_id,
        q_id:qrid,
        custom_attributes:prev_data.custom_attributes,
        validation_rules:prev_data.validation_rules,

        instruction:prev_data.instruction,
        disabled_rules:prev_data.disabled_rules,
        skip_logic:prev_data.skip_logic,
        enabled_rules:prev_data.enabled_rules,
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
        url: url+'question/'+quesid,
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
        if(values.question.type == 'text' || values.question.type == 'number'){
            values.question.options =[];
        }
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


                           

                           <div>
                            <button className='btn btn-primary' style={{ marginTop:'10px' }} type="submit">Submit</button>
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

UpdateQuestion.getInitialProps = async (context, client) => {
    const { data } = await client.get(url+'question-single/'+context.query.quesid);
    //const { section } = await client.get(url+'section-list/'+context.query.qrid);

    //console.log(section)
    return { prev_data:data };
};

export default UpdateQuestion;