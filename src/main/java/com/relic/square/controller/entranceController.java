package com.relic.square.controller;

import com.relic.square.domain.GenericRequest;
import com.relic.square.domain.GenericResponse;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Phoenix on 2016/10/30.
 */

@RestController
public class entranceController {

    @RequestMapping(value = "/greeting", method=RequestMethod.GET,produces = "application/json")
    public @ResponseBody
    GenericResponse greeting(){
        GenericResponse genericBody = new GenericResponse();
        genericBody.setStatus("Success");
        return genericBody;
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST, consumes="application/json")
    public @ResponseBody GenericResponse addUser(@RequestBody GenericRequest request) {
        GenericResponse genericBody = new GenericResponse();
        genericBody.setStatus("Success adding user.");
        genericBody.setMessage("Post method");
        return genericBody;
    }

}
