import { useState ,useEffect } from 'react';
import './singleCharacterLayout.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useParams, Link } from 'react-router-dom';

const SingleCharacterLayout = () => {

    const {charId} = useParams();
    const [singleChar, setSingleChar] = useState('');
    const {loading, error, getCharacterName, clearError, getCharacter} = useMarvelService();

    useEffect(()=>{
        getCharacter(charId)
        .then(res => {setSingleChar(res)})
    }, [charId])

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner width="200px" height="200px"/> : null;
    const content = !(loading || error ) && singleChar ? <View singleChar={singleChar}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({singleChar}) => {
    const {name, description, thumbnail} = singleChar;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main page</Link>
        </div>
    )
}

export default SingleCharacterLayout;