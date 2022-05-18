package com.example.simpletouristapp.ui.international;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class InternationalViewModel extends ViewModel {
    private final MutableLiveData<String> mText;

    public InternationalViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is International fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}