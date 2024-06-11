import  {Formik, Form, Field, ErrorMessage}  from "formik";
import './charSearchForm.scss';
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const CharSearchForm = () => {
    const [character, setCharacter] = useState(null)
    const {loading, error, getCharacterName, clearError, setError} = useMarvelService();
    const [newItemLoading, setNewItemLoading] = useState(false);

    console.log(character)

    const onRequest = (prop) => {
        getCharacterName(prop)
        .then(res => {
            setNewItemLoading(true)
            if(res && res.length){
                return setCharacter(res[0])
            }else {
                setError('Ничего не найдено')
                setCharacter(null)
                setNewItemLoading(false)
                console.log(error)
            }
        })
    }
    return (
        <>
        <Formik
        initialValues={{charName: ''}}
        validate={values => {
            clearError();
            setCharacter(null)
            const errors = {};
            if (!values.charName){
                errors.charName = 'Введите имя'
            }
            return errors;
        }}
        onSubmit={(values)=>onRequest(values.charName)}>
            <Form className="char__search-form">
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                            <ErrorMessage className="char__search-error" name="charName" component="div"/>
                            {error ? <div className="char__search-error" >{error}</div> : null}
                            {character && !error ? <View character={character}/> : null}
                        <button
                            type='submit'
                            disabled={loading} 
                            className="button button__main">
                            <div className="inner">{loading ? <Spinner width="25px" height="25px"/> : 'Find'}</div>
                        </button>
                    </div>
            </Form>
        </Formik>
        </>
    )
}

const View = ({character}) => {
    return(
        <div>
            <h1 className="char__search-success">Найден персонаж: {character.name}</h1>
            <Link to={`/singleChar/${character.id}`} className="single-comic__back">
                <button
                    type='submit' 
                    className="button button__main">
                    <div className="inner">to page</div>
                </button>
            </Link>
        </div>
    )
}

export default CharSearchForm;