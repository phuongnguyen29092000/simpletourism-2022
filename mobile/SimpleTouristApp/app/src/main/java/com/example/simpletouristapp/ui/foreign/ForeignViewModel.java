package com.example.simpletouristapp.ui.foreign;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ForeignViewModel extends ViewModel {
    private final MutableLiveData<String> mText;

    public ForeignViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is Foreign fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}