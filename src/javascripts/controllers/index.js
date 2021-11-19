export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'Top 10 Movies'})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'Top 10 Movies'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content: 'contact', title: 'Top 10 Movies'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'Top 10 Movies'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Top 10 Movies'})
}