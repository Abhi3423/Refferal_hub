import { db } from "../../../database/firestoreConfig";
import { collection, getDocs, addDoc, where, query,updateDoc } from "firebase/firestore";

export default async function temp(req,res){

    try {
        const adminEmail=req.body.adminEmail;
        const userEmail=req.body.userEmail;
        const resumeScore=req.body.resumeScore;
        const name=req.body.name;
        const formData=req.body.form;
        const q = query(collection(db, "refferar"), where("email", "==", adminEmail));
        const querySnapshot = await getDocs(q);
        const data={};
        const docRef = querySnapshot.docs[0];
        querySnapshot.forEach((doc) => {
            data.adminName=doc.data().name;
            data.referal_request=doc.data().referal_request;
        }
        );
        var referal_request=data.referal_request;
        if(referal_request==undefined){
            referal_request=[];
        }
       referal_request.push({userEmail:userEmail,resumeScore:resumeScore,name:name});
       await updateDoc(docRef.ref, {
        referal_request: referal_request,
      });
      // get user with user email and update pending invites array with admin 
        const q1 = query(collection(db, "refferar"), where("email", "==", userEmail));
        const querySnapshot1 = await getDocs(q1);
        const data1={};
        const docRef1 = querySnapshot1.docs[0];
        querySnapshot1.forEach((doc) => {
            data1.pending_invites=doc.data().pending_invites;
        }
        );
        var pending_invites=data1.pending_invites;
        if(pending_invites==undefined){
            pending_invites=[];
        }
        pending_invites.push({recruiterName:data.adminName,adminEmail:adminEmail,form:formData,accepted:false});
        await updateDoc(docRef1.ref, {
            pending_invites: pending_invites,
            });
      res.send({msg:"success"});

    } catch (error) {
        console.log(error);
    }
}