
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { heroCreated } from "../../actions";

const HeroesAddForm = () => {
    const[heroName, setHeroName] = useState('');
    const[heroDescription, setHeroDescription] = useState('');
    const[heroElem, setHeroElem] = useState('');

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElem
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(res => console.log(res, 'Sended!'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err))

        setHeroName('');
        setHeroDescription('');
        setHeroElem('');


    }
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={heroElem}
                    onChange={(e) => setHeroElem(e.target.value)}
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={onSubmitHandler}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;