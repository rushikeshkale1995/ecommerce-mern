import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import "../../styles/AuthStyles.css";

const Layouts = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '75vh' }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div>
    )
}
Layouts.defaultProps = {
    title: "Ecommerse - Shop now",
    description: "This is mern stack project",
    keywords: "MERN,Reactjs,nodejs,mongodb,html,css,bootstrap",
    author: "VAIBHAV RAHINJ",
}

export default Layouts