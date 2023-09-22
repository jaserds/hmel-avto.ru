import React, { useEffect, useContext, useState } from "react";
import Header from "../components/header/Header"
import SearchListComponent from "../components/searchComponents/SeacrchListComponent";
import {observer} from "mobx-react-lite"
import { Context } from "../index"
import InputServices from "../services/InputServices";
import SearchCarsServices from "../services/SearchCarsServices";
import Footer from "../components/footer/Footer";


const SearchCarPages = observer(() => {

    const {cars} = useContext(Context)

    const urlParams = new URLSearchParams(window.location.search);
    const allParams = [];
  

    const [page, setPage] = useState(1)
    const [isFetch, setIsFatch] = useState(false);
    const [loading, setLoading] = useState(false);

    const queryData = async (key, value) => {
      try {
        const result = await SearchCarsServices.getSearchCars(`${key}=${value}`, 5, page);
        cars.setSearchCars(result.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    }

    const fetchData = async () => {
      try {
        const result = await InputServices.getSearchCars(allParams.join('&'), 5, page); 
        setPage(page+1)
        cars.setSearchCars(result.data);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    }

    const paseParamAndQuery = () => {
      for (const param of urlParams.entries()) {
        const [key, value] = param;
        if (key === "searchtext"){
          queryData(key, value, 5, page)
          return setPage(page+1)
        } else {
          allParams.push(`${key}=${value}`)
        }
      }
      fetchData()
    }

    const fetchDataQurey = async () => {
      try {
        for (const param of urlParams.entries()) {
          const [key, value] = param;
          if (key === "searchtext"){
            const result = await SearchCarsServices.getSearchCars(`${key}=${value}`, 5, page);
            cars.AddSearchCars(result.data);
            setLoading(false)
            return setPage(page+1)
          } else {
            allParams.push(`${key}=${value}`)
          }
        }

        const result = await InputServices.getSearchCars(allParams.join('&'), 5, page); 
        setPage(page+1)
        cars.AddSearchCars(result.data);
        setLoading(false)
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      } finally {
        setIsFatch(false)
      }
    }

    useEffect(() => {
      paseParamAndQuery()
      }, []);

    useEffect(()=>{
      
      if (isFetch){
        setLoading(true)
        fetchDataQurey()
    }
    }, [isFetch])

    return (
        <div>
            <Header setPage={setPage}/>
            <section className="serach-result">
                <div className="container">
                    <h2 className="serach-result__title">
                        Результаты поиска
                    </h2>
                    <SearchListComponent setIsFatch={setIsFatch} loading={loading}/>
                </div>
            </section>
            <Footer />
        </div>
    )
});

export default SearchCarPages;