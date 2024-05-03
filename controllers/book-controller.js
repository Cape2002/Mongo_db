const {UserModel, BookModel}=require("../models");

  //DTO
  const issuedBook=require("../dtos/book-dto")
    //router.get("/",(req,res)=>{
    // res.status(200).json({success:true, data:books})
    // })
 exports.getAllBooks=async (req,res)=>{
    const books=await BookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message:"No Book found"
        })
    }
    res.status(200).json({
        success:true,
        data: books
    })
 };
exports.getSingleBookById=async (req,res)=>{
   const {id}=req.params; 

//    const book=books.find((each)=> each.id === id); 

   const book=await BookModel.findById(id)   

   if(!book)
     return res.status(404).json({
     success:false,
     message:"Book not found for the iven id"
    })
    res.status(200).json({
        success:true,
        data:books
    })
};

exports.getAllIssuedBooks=async (req,res)=>{
//     const usersWithIssuedBooks=users.filter((each)=>{
//     if(each.issuedBook) return each
//  })

const users=await UserModel.find({
    issuedBook:{$exists :true}
}).populate("issuedBook")
// const issuedBooks=[];
// usersWithIssuedBooks.forEach((each)=>{
// const book= books.find((book)=> book.id === each.issuedBook);

// book.issuedBy=each.name;
// book.issuedDate=each.issuedDate;
// book.returnDate=each.returnDate;

// issuedBooks.push(book);
// })

const issuedBooks=users.map((each)=> new IssuedBook(each))
if(issuedBooks.length === 0)
 return res.status(404).json({
success:false,
message:"No books has been Isuued"
})
return res.status(200).json({
success:true,
data:issuedBooks
})

}

exports.addNewBook = async (req,res)=>{
  
        const {data}=req.body;
        if(!data){
          return res.status(404).json({
            success:false,
            message:"Data not provided"
          })
        }
        // const book= books.find((each)=> each.id === data.id)
        await BookModel.create(data);
        // if(book)
        //   return res.status(400).json({
        // success:false,
        // message:"Book with the given id doesnot exist"
        // })
        // const allBooks=[...books, data]
        
        const allBooks=await BookModel.find();
        return res.status(200).json({
          success:true,
          data:allBooks
        })
        }
        
exports.updateBookById=async (req,res)=>{ 
const {id}=req.params;
const {data}=req.body;

// const book= books.find((each)=> each.id === id)
// if(!book)
//  return res.status(404).json({
//       success:false,
//       message:"book doesn't exist"})

//   const updateData=books.map((each)=>{
//     if(each.id === id){
//        return {...each, ...data}
//     }
//     return each
//   })

const updateData=await BookModel.findOneAndUpdate({_id: id}, data, {new: true})
  return res.status(200).json({
    success:true,
    data:updateData
  })

}
// module.exports={getAllBooks, getSingleBookById}