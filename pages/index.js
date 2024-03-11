import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import GuessResult from '../components/guess-results.component';
import useAPI from '../custom-hooks/useAPI';

const URL_AGE =   "https://api.agify.io";
const URL_GENDER = "https://api.genderize.io";
const URL_NATION = "https://api.nationalize.io";

const Home = () => {
  const [value, setValue] = useState("");
  const { data: ageData, loading: ageLoading, error: ageError, fetchData: fetchAge } = useAPI(URL_AGE);
  const { data: genderData, loading: genderLoading, error: genderError, fetchData: fetchGender } = useAPI(URL_GENDER);
  const { data: countryData, loading: countryLoading, error: countryError, fetchData: fetchCountry } = useAPI(URL_NATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(value.length < 3){
      return;
    };

    fetchAge(value);
    fetchGender(value);
    fetchCountry(value);
    setValue("");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Hy-vee Assignment</title>
      </Head>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Guess the person by name</h1>
        <input
          required 
          className={styles.guessInput}
          placeholder="Enter search name"
          value={value}
          onChange={({target}) => setValue(target.value)}
        />
        <button 
          type='submit' 
          className={styles.submit}
        >
          {ageLoading || genderLoading || countryLoading ? "Searching..." : "Submit"}
        </button>
      </form>
      {ageLoading || genderLoading || countryLoading ? 
        <h2 className={styles.header}>loading...</h2> : 
        <GuessResult 
          guessData={{
            data : {ageData, genderData, countryData},
            error : {ageError, genderError, countryError}
          }} 
        />
      }
    </div>
  );
};

export default Home;