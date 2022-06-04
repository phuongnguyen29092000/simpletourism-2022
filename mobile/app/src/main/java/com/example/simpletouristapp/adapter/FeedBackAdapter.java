package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.RatingBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import java.util.List;

public class FeedBackAdapter extends RecyclerView.Adapter<FeedBackAdapter.FeedBackViewHolder> {

    private Context context;
    private List<FeedBackResponse.FeedBack> feedBacks;
    private SharedPreferences sharedPref;

    public FeedBackAdapter(Context context, List<FeedBackResponse.FeedBack> feedBacks) {
        this.context = context;
        this.feedBacks = feedBacks;
        sharedPref = context.getSharedPreferences("Token",Context.MODE_PRIVATE);
    }

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public List<FeedBackResponse.FeedBack> getFeedBacks() {
        return feedBacks;
    }

    public void setFeedBacks(List<FeedBackResponse.FeedBack> feedBacks) {
        this.feedBacks = feedBacks;
    }

    @NonNull
    @Override
    public FeedBackViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_comment, parent, false);
        return new FeedBackViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FeedBackViewHolder holder, int position) {
        FeedBackResponse.FeedBack feedBack = feedBacks.get(position);

        holder.tvName.setText(feedBack.getCustomer().getGivenName() + " " + feedBack.getCustomer().getFamilyName());
        holder.rating.setRating(feedBack.getRating());
        holder.comment.setText(feedBack.getComment());
        if(sharedPref.getString("id_customer","").equals(feedBack.getCustomer().getId())){
            holder.btnEdit.setVisibility(View.VISIBLE);
            holder.btnDelete.setVisibility(View.VISIBLE);
        }
        holder.btnEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                holder.ratingBar.setVisibility(View.VISIBLE);
                holder.edtCommentLayout.setVisibility(View.VISIBLE);
                holder.rate.setVisibility(View.VISIBLE);
                holder.ratingBar.setRating(feedBack.getRating());
                holder.editComment.setText(feedBack.getComment());
            }
        });
    }

    @Override
    public int getItemCount() {
        return feedBacks.size();
    }

    public class FeedBackViewHolder extends RecyclerView.ViewHolder{
        private TextView tvName;
        private RatingBar rating;
        private TextView comment;
        private ImageButton btnEdit;
        private ImageButton btnDelete;
        private RatingBar ratingBar;
        private TextInputEditText editComment;
        private Button rate;
        private TextInputLayout edtCommentLayout;
        public FeedBackViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.txt_email_account);
            rating = itemView.findViewById(R.id.rating_feedback);
            comment = itemView.findViewById(R.id.txt_cmt_account);
            btnEdit = itemView.findViewById(R.id.btn_edit);
            btnDelete = itemView.findViewById(R.id.btn_delete);
            ratingBar = itemView.findViewById(R.id.comment_rating_feedback);
            editComment = itemView.findViewById(R.id.edt_comment);
            rate = itemView.findViewById(R.id.btn_rate);
            edtCommentLayout = itemView.findViewById(R.id.edt_comment_layout);
        }
    }
}
