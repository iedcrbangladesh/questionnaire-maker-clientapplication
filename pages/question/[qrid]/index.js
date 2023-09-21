import { useRouter } from 'next/router';
import Link from 'next/link';

const IndexQuestion = ({questions, questionnaire})=>{

    const router = useRouter()
    const { qrid } = router.query;
    
    const questionList = questions.map((question,i)=>{
        return(

            <tr key={question.id}>
                <th>
                    {i+1}
                </th>
                <td style={{ width:'10%' }}>  
                    {question.question_order}
                </td>
                <td style={{ width:'25%' }}>  
                {question.question_label} {question.label}
                </td>
                <td style={{ width:'25%' }}>  
  
                    {question.variable}
                </td>
                <td style={{ width:'25%' }}>  
  
                    {question.section.label}
                </td>
                <td>
                <Link className='btn btn-warning' href="/question/[qrid]/[quesid]/update" as={`/question/${qrid}/${question.id}/update`}>
                update
              </Link>
              </td>
                          
            </tr>

        )  
    })
    

    return(
        <div>
            
            
        {/*JSON.stringify(questions,2)*/}
        
        <table className='table table-bordered'>
        <tr>
            <th colSpan={2}>
            <Link href="/questionnaire">
                List Questionaarie
            </Link>
            </th>
            <th colSpan={2}>
            <Link href="/question/[qrid]/create" as={`/question/${qrid}/create`}>
                Create Question
              </Link>
            </th>
        </tr>

        <tr>
            <th colSpan={5}>{questionnaire.title}</th>
        </tr>
        <tr>
            <th>SL</th>
            <th>SORT ORDER</th>
            <th>Label</th>
            <th>Variable Name</th>
            <th>Section</th>
            <th>ACtion</th>
            </tr>
        {questionList}
        </table>
        </div>
    );

};
IndexQuestion.getInitialProps = async (context, client) => {
    //const { data } = await client.get('/api/question');

    //
    const id = context.query.qrid;
    const { data } = await client.get('/api/question/'+id);
    console.log(data);
  
    return { questions: data.question, questionnaire:data.questionnaire };
  };
export default IndexQuestion;