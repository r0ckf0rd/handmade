import React from 'react';
import { Link } from "react-router-dom";

class ProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.product;
        
        this.handleFiles = this.handleFiles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createDefaultSquares = this.createDefaultSquares.bind(this);
        this.createPreviewSquares = this.createPreviewSquares.bind(this);
        this.createUploadSquare = this.createUploadSquare.bind(this);
    }

    handleFiles(e) {

        const files = e.currentTarget.files;
        for (let idx = 0; idx < files.length;idx += 1) {
            const file = files[idx];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const newPictureFiles = this.state.pictureFiles;
                newPictureFiles.push(file);

                const newPictureURLs = this.state.pictureURLs;
                newPictureURLs.push(fileReader.result);
                this.setState({ pictureFiles: newPictureFiles, pictureURLs: newPictureURLs });
            }
            
            fileReader.readAsDataURL(file);
        }

    }

    // CHANGE THIS WHEN QUANTITY IS ADDED
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product[title]', this.state.title);
        formData.append('product[description]', this.state.description);
        formData.append('product[price]', this.state.price);

        if (this.state.pictureFiles.length > 0) {

            for (let i = 0; i < this.state.pictureFiles.length; i++) {
                formData.append('product[product_pictures][]', this.state.pictureFiles[i]);
            }
        }

        return $.ajax({
            url: '/api/products',
            method: `${this.props.ajaxMethod}`,
            data: formData,
            contentType: false,
            processData: false
            }).then( (response) => {
                this.setState(this.props.defaultState); 
                const newId = Object.keys(response.products)[0]
                this.props.history.push(`/products/${newId}`)       
            }
        );
    }


    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.currentTarget.value });
        }

    }

    createDefaultSquares(number) {
        const squares = [];
        const iClasses = [
            <i className="fas fa-robot"/>,
            <i className="fas fa-tshirt"/>,
            <i className="fas fa-mask"/>,
            <i className="fas fa-coffee"/>,
            <i className="fas fa-guitar"/>,
            <i className="fas fa-hat-wizard"/>,
            <i className="fas fa-chair"/>,
            <i className="fas fa-chess"/>,
            <i className="fas fa-horse"/>
        ]

        // CHANGE THIS - IDX < (10) TO ACCOUNT TO HOW FILES HAVE BEEN UPLOADED
        // TO RECREATE THE LI ARRAY EACH TIME WE RERENDER
        for (let idx = 0; idx < number; idx ++) {
            squares.push(
                <li key={`default-${idx}`} className="default-square">
                    <div className="inner-default-square">
                        {iClasses[idx]}
                    </div>
                </li>
            )
        }

        return squares;
    }


    // will make the array of actual preview files
    createPreviewSquares(number) {
        debugger
        const squares = [];


        for (let idx = 0; idx < number; idx += 1) {

            const preview = <img className="preview-image" src={this.state.pictureURLs[idx]}/>
            
            squares.push(
                <li key={`preview-${idx}`} className="preview-square">
                    <div className="inner-preview-square">
                        {preview}
                    </div>
                </li>
            )
        }
        debugger
        return squares;
    }


    createUploadSquare() {
        return(
            <li className="upload-square">
                <div className="inner-upload-square">
                    <div className="innermost-upload-square">
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <br/>
                        {/* <span className="upload-button-text">Add a photo</span> */}
                        <input className="file-input" type="file" multiple onChange={this.handleFiles}/>
                    </div>
                </div>
            </li>
        )
    }

    render() {
        debugger
        let previewSquares = this.createPreviewSquares(this.state.pictureFiles.length);

        let previewLength = previewSquares.length;
        let defaultLength = 9 - previewLength;

        let defaultSquares = this.createDefaultSquares(defaultLength);
        let uploadSquare = this.createUploadSquare();

        let allSquares = [];
        allSquares = Object.assign(allSquares, previewSquares, uploadSquare, defaultSquares);

        debugger

        return (
            <div className="form-component-box">
                <Link className="back-link" to="/shopManager"> <i className="fas fa-angle-left"/> Back to listings</Link>
                <h1 className="form-listing-component-header">{this.props.h1}</h1>
                <form className="form-box" onSubmit={this.handleSubmit}>

                    <div className="photo-section">

                        <div className="left-col">
                            <label className="pictures-label">
                                <h2 className="listing-form-h2">Photos: </h2>
                                <p className="about-pictures">
                                    Use up to ten photos to show your item's most important qualities.
                                    <br />
                                    <br />
                                    Tips:
                                </p>
                                <ul className="picture-tips">
                                    <li key={0}> Use natural light and no flash.            </li>
                                    <li key={1}> Include a common object for scale.         </li>
                                    <li key={2}> Show the item being held, worn, or used.   </li>
                                    <li key={3}> Shoot a clean, simple background.  </li>
                                </ul> 
                            </label>
                        </div>

                        <div className="right-col">
                            <ul className="file-squares-ul">
                                {previewSquares}
                                {uploadSquare}
                                {defaultSquares}
                            </ul>
                        </div>
                    
                    </div>

                    <div className="title-section">

                        <div className="left-col">
                            <label className="title-label" id="title-connected">
                                <h2 className="listing-form-h2">Title: </h2>
                                <p className="about-title">
                                    Include keywords that buyers would use to search for your item.
                                </p>
                            </label>
                        </div>
                        
                        <div className="right-col">
                            <input id="title-target" className="title-input" type="text" value={this.state.title} onChange={this.handleChange('title')} />
                        </div>

                    </div>


                    <div className="description-section">
                    
                        <div className="left-col">
                            <label className="description-label">
                                <h2 className="listing-form-h2">Description: </h2>
                                <p className="about-description">
                                    Start with a brief overview that describes your item's finest features.

                                    List details like dimensions and key features in easy-to-read bullet points.

                                    Tell buyers a bit about your process or the story behind this item.
                                </p>
                             </label>
                        </div>

                        <div className="right-col">
                            <textarea className="description-textarea" name="" cols="30" rows="10" value={this.state.description} onChange={this.handleChange('description')}></textarea>
                        </div>
                    </div>

                    <div className="price-section">
                    
                        <div className="left-col">
                            <label className="price-label">
                                <h2 className="listing-form-h2">Price: </h2>
                                <p className="about-price">
                                    Factor in the costs of materials and labor, plus any related business expenses.
                                    Consider the total price buyers will pay too—including shipping.
                                </p>
                            </label>
                        
                        </div>

                        <div className="right-col">
                            <input className="price-input" type="float" value={this.state.price} onChange={this.handleChange('price')} /> 
                        </div>

                    </div>

                    <input className="listing-form-submit" type="submit" value={this.props.formType} />
                </form>
            </div>
        );
    }
};


export default ProductForm;