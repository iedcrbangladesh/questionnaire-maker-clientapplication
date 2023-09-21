import { useRouter } from 'next/router';
import Link from 'next/link';

const IndexSection = ({sections, questionnaire})=>{

    const router = useRouter()
    const { qrid } = router.query;
    
    const sectionList = sections.map((section,i)=>{
        return(

            <tr key={section.id}>
                <th>{i+1}</th>
                <th>{section.section_order}</th>
                <td>{section.label}</td> 
                <td>{section.slug}</td>
                <td>
                <Link href="/section/[qrid]/[quesid]/update" as={`/section/${qrid}/${section.id}/update`}>
                    update this
                </Link>
                </td>
                          
            </tr>

        )  
    })
    

    return(
        <div>
            <Link href="/questionnaire">
                List Questionaarie
            </Link>
            <Link style={{ marginLeft:"10px" }}  href="/section/[qrid]/create" as={`/section/${qrid}/create`}>
                Create Section
              </Link>
        {/*JSON.stringify(questions,2)*/}
        <h3>{questionnaire.title}</h3>
        <table className='table table-bordered'>
            <tr>
            <th>SL</th>
            <th>SORT ORDER</th>
            <th>Label</th>
            <th>SLUG</th>
            <th>ACtion</th>
            </tr>
        {sectionList}
        </table>
        </div>
    );

};
IndexSection.getInitialProps = async (context, client, url) => {
    //const { data } = await client.get('/api/question');

    //
    console.log(process.env.URL)
    const id = context.query.qrid;
    const { data } = await client.get(process.env.URL+'section/'+id);
    console.log(data);
  
    return { sections: data.section, questionnaire:data.questionnaire };
};
export default IndexSection;