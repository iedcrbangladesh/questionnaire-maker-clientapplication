import Link from 'next/link';

const IndexQuestionarie = ({questionnaires})=>{

    const questionnaireList = questionnaires.map((questionnaire) => {
        return (
          <tr key={questionnaire.id}>
            <td>{questionnaire.title}</td>
            <td>{questionnaire.version}</td>
            
            <td>
              <Link href="/questionnaire/[qrid]/create" as={`/questionnaire/${questionnaire.id}/create`}>
                Update
              </Link>
              </td>
                
              <td>
              <Link href="/question/[qrid]/create" as={`/question/${questionnaire.id}/create`}>
                Create Question
              </Link>
              </td>
              <td>
              <Link style={{ marginLeft:'10px' }} href="/question/[qrid]" as={`/question/${questionnaire.id}`}>
                Show Question
              </Link>
              </td>
              <td>
              <Link style={{ marginLeft:'10px' }} href="/section/[qrid]/create" as={`/section/${questionnaire.id}/create`}>
                Create Section
              </Link>
              </td>
              <td>
              <Link style={{ marginLeft:'10px' }} href="/section/[qrid]" as={`/section/${questionnaire.id}`}>
                Show Section
              </Link>
              </td>
        
              

            
        
          </tr>
        );
      });

    return(
        <div>
        <table className='table table-bordered' style={{ width:'50%' }}>
          <tr>
            <th>
        <Link href="/">
            Back to Home
        </Link>
        </th>
        <th>  
        <Link href="/questionnaire/create">
            Create Questionaarie
        </Link>
        </th>
        </tr>
        </table>
       
        {questionnaireList &&
        <table className='table table-bordered'>
        <thead>
          <th colSpan={7}>Questionaarie List</th>
        </thead> 
        <tbody>
        {questionnaireList}
        </tbody>  
        
        </table>
}
        </div>
    );
    
};


IndexQuestionarie.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/questionnaire');
    //console.log(data);
  
    return { questionnaires: data };
  };
export default IndexQuestionarie;