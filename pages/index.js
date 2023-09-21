import Link from 'next/link';

const LandingPage = ({ currentUser }) => {
  

  return (
    <div>
      <h1>IEDCR QUESTIONARIE FRAMEWORK {currentUser}</h1>
      <Link href="questionnaire">Questionnaire</Link>
      
    </div>
  );
};

LandingPage.getInitialProps = async (context, currentUser) => {
  //const { data } = await client.get('/api/tickets');
  console.log(currentUser);
  //return { tickets: data };
  return {};
};

export default LandingPage;
