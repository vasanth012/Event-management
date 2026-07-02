import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/API";

function AddEvent() {

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: "",
        description: "",
        location: ""
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {

            const response = await API.post(
                `/events/${user.id}`,
                event
            );

            if (response.status === 200 || response.status === 201) {

                alert("Event Added Successfully");

                setEvent({
                    name: "",
                    description: "",
                    location: ""
                });

                navigate("/events");
            }

        } catch (error) {

            console.error(error);

            alert("Failed to add event.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Add Event
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Event Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={event.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        value={event.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={event.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Add Event
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AddEvent;