import React from 'react';
import styles from '../styles/Home.module.css';

const GuessResult = ({ guessData = {} }) => {
  const { data, error } = guessData;

  const getUserCountry = () => {
    let mostProbableCountry = null;
    data.countryData?.country?.forEach((country) => {
        if(!mostProbableCountry || country.probability > mostProbableCountry.probability){
            mostProbableCountry = country;
        }
    });
    if(mostProbableCountry) {
        return `${mostProbableCountry.country_id} [Probability - ${mostProbableCountry.probability.toFixed(3)}]`
    }
    return "";
  }

  return (
    <>
        <div className={styles.resultCard}>
            <h2 className={styles.header}>Guess for "{data.ageData?.name ?? data.genderData?.name ?? ""}"</h2>
            <div>
                Estimated Age{" : "}
                <span className={styles.title}>{data.ageData?.age ?? ""}</span> 
            </div>
            {error.ageError && (
                <div className={styles.error}>{error.ageError?.error}</div>
            )}
            <div>
                Gender{" : "}
                <span className={styles.title}>{data.genderData?.gender ?? ""}</span> 
            </div>
            {error.genderError && (
                <div className={styles.error}>{error.genderError?.error}</div>
            )}
            <div>
                Country{" : "}
                <span className={styles.title}>{getUserCountry()}</span> 
            </div>
            {error.countryError && (
                <div className={styles.error}>{error.countryError?.error}</div>
            )}
        </div>
    </>
  );
};

export default GuessResult;
