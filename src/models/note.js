const mongoose = require("mongoose");
const Joi = require('joi');

const PatientbedSchema = new mongoose.Schema({
    payment_status: {
        type: String,
        required: true
    },
    paid_amount: {
        type: Number,
        required: true
    },
    payment_link: {
        type: String,
        required: true
    },
    booking_status: {
        type: String
    },
    sample_collection_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    start_time: {
        type: Date,
        required: true
    },
    vendor_customer_id: {
        type: Number,
        required: true
    },
    customer_status: {
        type: String
    },
    remark: {
        type: String
    },
    ref_booking_sample_collection_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    ref_booking_start_time: {
        type: Date
    },
    ref_booking_end_time: {
        type: Date
    },
    booking_sample_status: {
        "bookingDetail": {
            "order_id": { type: Number },
            "delivery_status_1": { type: String },
            "customer": {
                "customer_name": { type: String },
                "customer_gender": { type: String },
                "delivery_status": { type: String },
                "product_details": [
                    {
                        "code": { type: String },
                        "name": { type: String },
                        "parameter": { type: Number }
                    }
                ]
            }
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Bed = mongoose.model("Bed", PatientbedSchema);

const validateBed = (bed) => {
    const schema = {
        payment_status: Joi.string().required(),
        paid_amount: Joi.number().required(),
        payment_link: Joi.string().required(),
        booking_status: Joi.string().required(),
        sample_collection_date: Joi.date().timestamp().required(),
        start_time: Joi.date().timestamp().required(),
        vendor_customer_id: Joi.number().required(),
        customer_status: Joi.string().required(),
        remark: Joi.string().required(),
        ref_booking_sample_collection_date: Joi.date().required(),
        ref_booking_start_time: Joi.date().timestamp().required(),
        ref_booking_end_time: Joi.date().timestamp().required(),
        booking_sample_status: {
            bookingDetail: {
                order_id: Joi.number().required(),
                delivery_status_1: Joi.string().required(),
                customer: {
                    customer_name: Joi.string().required(),
                    customer_gender: Joi.string().required(),
                    delivery_status: Joi.string().required(),
                    product_details: [
                        {
                            code: Joi.string().required(),
                            name: Joi.string().required(),
                            parameter: Joi.number().required()
                        }
                    ]
                }
            }
        },
    }
    return Joi.validate(bed, schema);
}

exports.Bed = Bed;
exports.validate = validateBed;