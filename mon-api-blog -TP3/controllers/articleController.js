const TestApi=(req,res)=>{
    res.status(200).json({message:"Le test depuis le controller a fonctionné !", success:true})};

const createArticle=(req,res)=>{
        const articleData=req.body;
        console.log('Données reçues par le controller:', articleData);
        res.status(201).json({
            message: 'Article créé avec succès via controller!',
            article: { id: Date.now(), ...articleData }
        });
    }
module.exports={TestApi,createArticle};