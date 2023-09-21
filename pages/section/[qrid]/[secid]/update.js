import React, { useState,Fragment } from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import Link from 'next/link';

import { useRouter } from 'next/router';
import useRequest from '../../../../hooks/use-request';
import {SectionType} from '../../../../components/question/Types';
import TextArea from '../../../../components/TextArea';


const url = process.env.URL;
const UpdateQuestion = ({prev_data})=>{

    
    const router = useRouter()
    const { qrid, secid } = router.query;
    

    const section = {
        label:prev_data.label,
        slug:prev_data.slug,
        section_order:prev_data.section_order,
        type:prev_data.type,
        instruction:prev_data.instruction,        
        q_id:qrid
    };

    
    
    
    const [data, setData] = useState(section);

    const { doRequest, errors } = useRequest({
        url: url+'section/'+secid,
        method: 'post',
        body: data,
        onSuccess: () => {
            router.push('/section/'+qrid);
        },
      });


      const handleSubmit =(values)=>{
        //console.log(values);
        //setData(values.section);
        //alert(JSON.stringify(data,2));
        doRequest(values.section);
      };


    return(
        <Fragment>
            <Link href="/questionnaire">
                List Questionaarie
            </Link>
            <Link href={`/section/${qrid}`}>
                List Section
            </Link>
            <h5>Update Section for Questionaarie {qrid}</h5>
            <Formik
            initialValues={{ section }}

            onSubmit={handleSubmit}
            render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(
                <div>
                <Form>
                <label htmlFor="section.label"></label>
                    <Field className='form-control' name={`section.label`} placeholder='Title' />
                    <label htmlFor="section.slug"></label>
                    <Field className='form-control' name={`section.slug`} placeholder='Slug' />
                    <label htmlFor="section.section_order"></label>
                    <Field type="number" min="0" className='form-control' name={`section.section_order`} placeholder='Sort Order' />
                           

                    <label>Section Type </label>                       
                           <Field className="form-control" as="select" name="section.type" onChange={(e) => { 
                                     //console.log('Value', e.target.value);
                                     const type = e.target.value;
                                     
                                    
                                     

                                     setFieldValue('section.type', type);



                           }}>
                                <option value="">(Select Type)</option>
                                {SectionType.map((type, i)=>{
                                    return (
                                        <option key={i} value={type.value}>{type.title}</option>
                                    )
                                })}
                           </Field>

                           <label htmlFor="section">Section instruction</label>
                           
                           <TextArea name="section.instruction"
                placeholder="Section instruction "
                rows="3"
                className="form-control" 
                />
                           <div>
                            <button type="submit">Submit</button>
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
    const { data } = await client.get(url+'section-single/'+context.query.secid);
    //console.log(data);
    return { prev_data:data };
};

export default UpdateQuestion;