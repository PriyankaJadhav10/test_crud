const noteModel = require("../models/note");

const createPatientBed = async (req, res) =>{
    
    const {payment_status, paid_amount,payment_link,booking_status,
        sample_collection_date,start_time,vendor_customer_id,
        customer_status,remark,ref_booking_sample_collection_date,
        ref_booking_start_time,ref_booking_end_time,
        booking_sample_status: {
            bookingDetail: {
                order_id,
                delivery_status_1,
                customer: {
                    customer_name,
                    customer_gender,
                    delivery_status,
                    product_details: [
                        { code,  name,parameter
                        }
                    ]
                }
            }
        }
    } = req.body;

    const newBed = new noteModel({
        payment_status: payment_status,
        paid_amount : paid_amount,
        payment_link: payment_link,
        booking_status : booking_status,
        sample_collection_date: sample_collection_date,
        start_time : start_time,
        vendor_customer_id: vendor_customer_id            ,
        customer_status : customer_status,
        remark: remark,
        ref_booking_sample_collection_date : ref_booking_sample_collection_date,
        ref_booking_start_time:ref_booking_start_time,
        ref_booking_end_time :ref_booking_end_time,
        booking_sample_status: {
            bookingDetail: {
                order_id: order_id,
                delivery_status_1: delivery_status_1,
                customer: {
                    customer_name: customer_name,
                    customer_gender: customer_gender,
                    delivery_status: delivery_status,
                    product_details: [
                        {
                            code: code,
                            name: name,
                            parameter: parameter
                        }
                    ]
                }
            }
        },
        userId : req.userId
    });

    try {
        
        await newBed.save();
        res.status(201).json(newBed);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
    
}

const updatePatientBed = async (req, res) =>{
    const id = req.params.id;
    const {payment_status, paid_amount,payment_link,booking_status,
        sample_collection_date,start_time,vendor_customer_id,
        customer_status,remark,ref_booking_sample_collection_date,
        ref_booking_start_time,ref_booking_end_time,
        booking_sample_status: {
            bookingDetail: {
                order_id,
                delivery_status_1,
                customer: {
                    customer_name,
                    customer_gender,
                    delivery_status,
                    product_details: [
                        { code,  name,parameter
                        }
                    ]
                }
            }
        }} = req.body;

    const newBed = {
        payment_status: payment_status,
        paid_amount : paid_amount,
        payment_link: payment_link,
        booking_status : booking_status,
        sample_collection_date: sample_collection_date,
        start_time : start_time,
        vendor_customer_id: vendor_customer_id            ,
        customer_status : customer_status,
        remark: remark,
        ref_booking_sample_collection_date : ref_booking_sample_collection_date,
        ref_booking_start_time:ref_booking_start_time,
        ref_booking_end_time :ref_booking_end_time,
        booking_sample_status: {
            bookingDetail: {
                order_id: order_id,
                delivery_status_1: delivery_status_1,
                customer: {
                    customer_name: customer_name,
                    customer_gender: customer_gender,
                    delivery_status: delivery_status,
                    product_details: [
                        {
                            code: code,
                            name: name,
                            parameter: parameter
                        }
                    ]
                }
            }
        },
        userId : req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, newBed, {new : true});
        res.status(200).json(newBed);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const deletePatientbed = async (req, res) =>{

    const id = req.params.id;
    try {
        
        const bed = await noteModel.findByIdAndRemove(id);
        res.status(202).json(bed);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getPatientbeds = async (req, res) =>{
    try {
        
        const beds = await noteModel.find({userId : req.userId});
        res.status(200).json(beds);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    createPatientBed,
    updatePatientBed,
    deletePatientbed,
    getPatientbeds
}