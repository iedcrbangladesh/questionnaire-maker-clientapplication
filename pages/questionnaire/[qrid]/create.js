import {Formik, Form, Field} from 'formik';
import { useState } from 'react';
import useRequest from '../../../hooks/use-request';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { QuestionnarieTypes } from '../../../components/question/Types';

const url = process.env.URL;

const UpdateQuestionnaire = ({prev_data})=>{

    const router = useRouter()
    const { qrid } = router.query;

    const questionnaire = {
        title:prev_data.title,
        type:prev_data.type,
        version:prev_data.version,
    };
    const [data, setData] = useState(questionnaire);

    const { doRequest, errors } = useRequest({
        url: url+'questionnaire/'+qrid,
        method: 'post',
        body: data,
        onSuccess: () => {
            Router.push('/questionnaire/')
        },
      });

      const handleSubmit =(values)=>{
        //console.log(values);
        setData(values.questionnaire);
        //alert(JSON.stringify(data,2));
        doRequest(values.questionnaire);
      };


    return(
        <div>
          <Link href="/">
            Back to Home
          </Link>   
          <Link href="/questionnaire/">
            List Questionaarie
          </Link>

            <Formik
            initialValues={{ questionnaire }}
            onSubmit={ handleSubmit}
            render={({isValid, isSubmitting,values,errors, touched, setFieldValue, setFieldTouched})=>(

            <div>
                <Form>
                    <label htmlFor="questionnaire.title"></label>
                    <Field name={`questionnaire.title`} placeholder='Title' />

                    <label>Questionaarie Type                        
                           <Field as="select" name={`questionnaire.type`} onChange={(e) => { 
                                    const type = e.target.value;
                                    setFieldValue('questionnaire.type', type);


                           }}>
                                <option value="">(Select Type)</option>
                                {QuestionnarieTypes.map((type)=>{
                                    return (
                                        <option value={type.value}>{type.title}</option>
                                    )
                                })}
                           </Field>
                           </label>
                           <Field name={`questionnaire.version`} placeholder='Version' />

                           <div>
                            <button  type="submit">Submit</button>
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
UpdateQuestionnaire.getInitialProps = async (context, client) => {
  const { data } = await client.get(url+'questionnaire-single/'+context.query.qrid);
  //console.log(data);
  return { prev_data:data };
};


export default UpdateQuestionnaire;