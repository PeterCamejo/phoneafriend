
const nextCOptions = {
    onError(err, req, res){
        console.log(err);
        res.statusCode = err.status  ? err.status: 500;
        res.json({message: err.message});
    }
};

export default nextCOptions;