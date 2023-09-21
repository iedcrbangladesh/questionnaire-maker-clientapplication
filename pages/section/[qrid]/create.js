import {Formik, Form, Field} from 'formik';
import { useState } from 'react';
import useRequest from '../../../hooks/use-request';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {SectionType} from '../../../components/question/Types';
import TextArea from '../../../components/TextArea';

const url = process.env.URL;
const CreateSection = ()=>{
    //const url = process.env.URL;
    //console.log(url)
    
    const router = useRouter()
    const { qrid } = router.query;

    const section = {
        label:'',
        slug:'',
        section_order:0,
        type:0,
        instruction:'',
        q_id:qrid
    };
    const [data, setData] = useState(section);

    const { doRequest, errors } = useRequest({
        url: url+'section',
        method: 'post',
        body: data,
        onSuccess: () => {
            Router.push('/section/'+qrid)
        },
      });

      const handleSubmit =(values)=>{
        //console.log(process.env);
        setData(values.section);
        //alert(JSON.stringify(data,2));
        doRequest(values.section);
      };


    return(
        <div>
          <Link href="/">
            Back to Home
          </Link>
          <Link style={{ marginLeft:"10px" }} href="/questionnaire">
                List Questionaarie
            </Link>   
          <Link style={{ marginLeft:"10px" }} href={`/section/${qrid}`}>
            List Section
          </Link>

            <Formik
            initialValues={{ section }}
            onSubmit={ handleSubmit}
            render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

            <div>
                <Form>
                    <label htmlFor="section.label">Name</label>
                    <Field className='form-control' name={`section.label`} placeholder='Title' />
                    <label htmlFor="section.slug">SLUG</label>
                    <Field className='form-control' name={`section.slug`} placeholder='Slug' />
                    <label htmlFor="section.section_order">Sort Order</label>
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
                        <button className='btn btn-primary'  type="submit">Submit</button>
                      </div>
                </Form>
                {
                <code>
                        <pre>Submit Values: {JSON.stringify(data, null, 2)}</pre>
                            </code>}    
                    <code>
                        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                    </code>

            </div>
            )}            
            />

        </div>
    )
};
/*
export async function getServerSideProps() {

  return { props: { url:process.env.URL } }

  
}
*/
export default CreateSection;