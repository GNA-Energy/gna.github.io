const CareersListing = document.getElementById("careers-listing");
const JobPopup = document.getElementById("job-popup");



let jobs= []

fetch("https://careers.gna.energy/jobs/get_jobs/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },   "Accept": ""
})
.then((response) => response.json())
.then((data) => {
    let htmlContent = ""; // Initialize an empty string to accumulate HTML content
    jobs= data;

    data.forEach((job) => { 
        console.log(job);

        htmlContent +=
        `
        <div class="col-md-4" onClick=seeJobDetails(${job.id})>
            <div class="careers-job-box" >
                <h3>${job.title}</h3>
                <p>${job.job_description}</p>
                <div class="career-jobs-tags">
                ${
                    job.tags.map((tag) => {
                        return `<div class="career-jobs-tag">
                     ${tag}</div>`}).join("")
                }
             
                </div>
                <div class="career-job-items">
                    <div class="career-job-item">
                        <img src="./assets/images/clock.svg" title="Arrow" alt="Gna-Clock" />
                        <span>Full Time</span>
                    </div>
                    <div class="career-job-item">
                        <img src="./assets/images/onsite.svg" title="Arrow" alt="Gna-onsite" />
                        <span>On Site</span>
                    </div>
                </div>
                <h3>Apply Now</h3>
            </div>
        </div>
        `;
    });

    CareersListing.innerHTML = CareersListing.innerHTML + htmlContent;
});


function seeJobDetails(jobid) {
    let job = jobs.find((job) => job.id == jobid);
    console.log(job);
    JobPopup.innerHTML= `
    <div class="career-job-detail-wrapper" onclick="closeJobDetails()" id="jobDetails"
    aria-labelledby="jobDetailsLabel" aria-hidden="true">
    <div class="career-job-detail container" onclick="event.stopPropagation() ">
        <!-- Head Section -->
        <section>
        <div class="d-flex justify-content-between">
            <h1>${job.title}</h1>
            <img class="career-close-icon" src="./assets/images/close.svg" height="24" width="24" onclick="closeJobDetails()" />
            </div>
            <div class="d-flex justify-content-start">
                <img src="./assets/images/location-filled.svg" height="24" width="24" />
                <p class="ms-3">${job.location}</p>
            </div>
            <p>
                Department / Full Time / On-Site
                <span class="career-gray-text">(Posted 4 Days ago)</span>
            </p>
        </section>
        <!-- Body Section -->
        <section>
            <!-- About Us -->
            <div>
                <h3 class="mt-5">About Us</h3>
                <p class="mt-4">${job.about_us}</p>
            </div>
            <!-- Job Description -->
            <div>
                <h3 class="mt-5">Job Description</h3>
                <p class="mt-4">${job.job_description}</p>
            </div>
            <!-- Responsibilities -->
            <div>
                <h3 class="mt-5">Responsibilities</h3>
               ${job.responsibilities}
            </div>
            <!-- Experience -->
            <div>
                <h3 class="mt-5">Preferred Experience</h3>
                <p class="mt-4">${job.preferred_experience}</p>
            </div>
            <!-- Qualification -->
            <div>
                <h3 class="mt-5">Preferred Qualification</h3>
                <p class="mt-4">${job.preferred_qualifications}</p>
            </div>
            <div class="row justify-content-center mt-5">
                <button onclick="applyForm(${jobid})" class="btn orange-btn career-apply-button" title="Apply Now">
                    Apply Now
                </button>
            </div>
        </section>
    </div>
</div>
    `;
}

function applyForm(jobid){
    let job = jobs.find((job) => job.id == jobid);
    JobPopup.innerHTML= `
    <div class="career-job-detail-wrapper" onclick="closeJobDetails()">
        <div
          class="career-job-form container"
          onclick="event.stopPropagation()"
        >
        <div class="d-flex justify-content-between">
        <h1>${job.title}</h1>
        <img class="career-close-icon" src="./assets/images/close.svg" height="24" width="24" onclick="closeJobDetails()" />
        </div>
          <h3>Submit Your Application</h3>
          <form class="career-form"  
          
            onsubmit="_handleFormSubmission(event, ${jobid})"
          id="career-form">
            <div class="mb-3">
              <label for="resume"  class="form-label">Resume/CV*</label>
              <div>
                <label for="resume" class="career-custom-file-upload">
                    <img src="assets/images/file-attach.svg"/> <span  id = "resume-label">  Attach Resume/CV </span>
                </label>
              <input
                type="file"

                class="form-control"
                id="resume"
                name="resume"
                aria-describedby="resume"
                required
              />
            </div></div>
            <div class="mb-3 mt-5">
              <label for="name" class="form-label">Full Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                aria-describedby="name"
                required
              />
            </div>
            <h3 class="mt-5">Contact</h3>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                type="text"
                class="form-control"
                name="phone"
                id="phone"
                aria-describedby="phone"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"

                name="email"
                aria-describedby="email"
                required
              />
            </div>
            <div class="row justify-content-center mt-5">
            <button type="submit" class="btn orange-btn career-apply-button">
              Submit
            </button></div>
          </form>
        </div>
      </div>
    `
    
    const fileInput = document.getElementById("resume");
const fileLabel = document.getElementById("resume-label");

fileInput.addEventListener("change", (e) => {
    if(fileInput.files[0].name.length > 20) {
        fileLabel.innerHTML = fileInput.files[0].name.substring(0, 20) + "...";
    }
    else{
    fileLabel.innerHTML = fileInput.files[0].name.substring(0, 20) ;
}});
}


function _handleFormSubmission(e, jobid){
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData.get("email"));
    formData.append("job_id", jobid);
    // Send the form data to the server
    JobPopup.innerHTML=`
    <div class="career-job-detail-wrapper" onclick="closeJobDetails()">
    
    <div class="career-loader"></div>

    </div>`
    
    fetch("https://careers.gna.energy/jobs/apply/", {
        method: "POST",
        body: formData,
    }).then((response) => {
        if(response.ok){
         JobPopup.innerHTML= `<div class="career-job-detail-wrapper" onclick="closeJobDetails()">
         
         <img src="assets/images/applied-succesfully.gif" alt="Success" />
         </div>`;
         // wait for 2 seconds and close the popup
            setTimeout(() => {
                closeJobDetails();
            }, 2000);
        }
        else{
            alert("Application submission failed");
        }
    }
    );

}






function closeJobDetails() {
     JobPopup.innerHTML= "";
}